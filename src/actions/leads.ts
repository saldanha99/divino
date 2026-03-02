'use server';

import { LeadStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export type SmartLeadData = {
    name: string;
    whatsapp: string;
    serviceType: string;
    city: string;
    urgency: string;
};

export async function createSmartLead(data: SmartLeadData) {
    try {
        const lead = await prisma.lead.create({
            data: {
                name: data.name,
                contact: data.whatsapp.replace(/\D/g, ''), // Save only digits for consistent matching
                serviceType: data.serviceType,
                city: data.city,
                urgency: data.urgency,
                status: 'NEW',
            }
        });

        // AUTOMATION: Send personalized greeting + group notification
        try {
            const { sendWhatsappMessage, sendLeadNotification, sendGroupNotification } = await import('@/services/whatsappService');

            const greeting = await sendLeadNotification(data.name.split(' ')[0], data.serviceType, data.city);

            // Must AWAIT in serverless environment to ensure execution
            await Promise.allSettled([
                sendWhatsappMessage(data.whatsapp, greeting),
                sendGroupNotification(data)
            ]);
        } catch (msgError) {
            console.error("Error sending automations:", msgError);
            // Don't fail the lead creation if messaging fails
        }

        return { success: true, leadId: lead.id };
    } catch (error) {
        console.error("Error creating lead:", error);
        return { success: false, error: "Erro ao salvar contato." };
    }
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
    try {
        // Fetch the lead first to get contact info for automation
        const lead = await prisma.lead.findUnique({ where: { id: leadId } });

        if (!lead) {
            return { success: false, error: 'Lead not found' };
        }

        const oldStatus = lead.status;

        // Update status in DB
        await prisma.lead.update({
            where: { id: leadId },
            data: { status }
        });

        // AUTOMATION: Send WhatsApp message based on status transition
        if (oldStatus !== status) {
            try {
                const { sendStatusChangeMessage } = await import('@/services/whatsappService');
                // Fire and forget — don't block the UI response
                sendStatusChangeMessage(lead.contact, lead.name, status).catch(err =>
                    console.error(`[Automation] Status message failed for ${leadId}:`, err)
                );
            } catch (err) {
                console.error('[Automation] Import error:', err);
            }
        }

        return { success: true };
    } catch (error) {
        console.error("Error updating status:", error);
        return { success: false };
    }
}
