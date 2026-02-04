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
        const { sendWhatsappMessage } = await import('@/services/whatsappService');

        const firstName = data.name.split(' ')[0];
        const greeting = `Olá ${firstName}, aqui é da Divino Locações! 🚜\n\nRecebemos sua solicitação de *${data.serviceType}* em *${data.city}*.\n\nComo sua urgência é *${data.urgency}*, já encaminhei para nosso engenheiro responsável. Podemos continuar o atendimento por aqui?`;

        // Start async (fire and forget) to speed up UI response
        sendWhatsappMessage(data.whatsapp, greeting).catch(err => console.error('Auto-reply failed', err));

        return { success: true, leadId: lead.id };
    } catch (error) {
        console.error("Error creating lead:", error);
        return { success: false, error: "Erro ao salvar contato." };
    }
}
