import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function sendWhatsappMessage(phone: string, message: string) {
    try {
        // 1. Get the first connected instance
        const instance = await prisma.whatsappConfig.findFirst({
            where: { status: 'CONNECTED' },
            orderBy: { updatedAt: 'desc' }
        });

        if (!instance) {
            console.warn('No connected WhatsApp instance found.');
            return false;
        }

        const baseUrl = process.env.EVOLUTION_API_URL;
        const apiKey = process.env.EVOLUTION_API_KEY || instance.apiKey; // Use global or instance-specific key

        if (!baseUrl || !apiKey) {
            console.error('Evolution API credentials missing.');
            return false;
        }

        // Format phone number (Remove non-digits, ensure 55 prefix)
        let formattedPhone = phone.replace(/\D/g, '');
        if (!formattedPhone.startsWith('55')) {
            formattedPhone = `55${formattedPhone}`;
        }
        // Handle 9th digit if necessary (Evolution often handles it, but good to be safe. keeping as is usually works)

        // 2. Send Message via Evolution API
        const response = await fetch(`${baseUrl}/message/sendText/${instance.instanceName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            },
            body: JSON.stringify({
                number: formattedPhone,
                text: message
            })
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Evolution API Error:', error);
            return false;
        }

        return true;

    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return false;
    }
}
