'use server';

import { PrismaClient } from '@prisma/client';

// Use a singleton pattern if possible, essentially new Client for now as standardized in previous steps
const prisma = new PrismaClient();

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
                contact: data.whatsapp,
                serviceType: data.serviceType,
                city: data.city,
                urgency: data.urgency,
                status: 'NEW',
                // Optional: Notify via Evolution API here if needed later
            }
        });

        // Revalidate cache or trigger notifications
        // await notifyAdmin(lead); // Future step

        // AUTOMATION: Send personalized greeting
        const { sendWhatsappMessage, sendLeadNotification, sendGroupNotification } = await import('@/services/whatsappService');

        // Generate personalized message using the new template logic
        const greeting = await sendLeadNotification(data.name.split(' ')[0], data.serviceType, data.city);

        // Start async (fire and forget) to speed up UI response
        // Using provided Global Key/Instance logic in service
        sendWhatsappMessage(data.whatsapp, greeting).catch(err => console.error('Auto-reply failed', err));

        // NOTIFICATION: Send to Sales Group
        sendGroupNotification(data).catch(err => console.error('Group notification failed', err));

        return { success: true, leadId: lead.id };
    } catch (error) {
        console.error("Error creating lead:", error);
        return { success: false, error: "Erro ao salvar contato." };
    }
}

export async function updateLeadStatus(leadId: string, status: any) { // Using 'any' briefly to match LeadStatus without importing Enum if complex, but better to import
    try {
        await prisma.lead.update({
            where: { id: leadId },
            data: { status }
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating status:", error);
        return { success: false };
    }
}
