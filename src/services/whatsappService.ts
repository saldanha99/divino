import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function sendWhatsappMessage(phone: string, message: string) {
    try {
        // 1. Fetch active instance from Database or Env
        const dbInstance = await prisma.whatsappConfig.findFirst({
            where: { status: 'CONNECTED' }
        });

        const instanceName = dbInstance?.instanceName || process.env.EVOLUTION_INSTANCE_NAME;
        const apiKey = dbInstance?.apiKey || process.env.EVOLUTION_API_KEY;
        const baseUrl = process.env.EVOLUTION_API_URL;

        if (!instanceName || !baseUrl || !apiKey) {
            console.warn('WhatsApp not configured. Missing valid instance or credentials.');
            return false;
        }

        // Format phone number (Remove non-digits, ensure 55 prefix)
        let formattedPhone = phone.replace(/\D/g, '');
        if (!formattedPhone.startsWith('55')) {
            formattedPhone = `55${formattedPhone}`;
        }

        try {
            const response = await fetch(`${baseUrl}/message/sendText/${instanceName}`, {
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
                const errorText = await response.text();
                console.error('Evolution API Error:', errorText);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Fetch Error:', error);
            return false;
        }
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return false;
    }
}

export async function sendLeadNotification(leadName: string, serviceType: string, city: string) {
    // Determine message based on service
    let message = "";

    // Cleaning service string for matching
    const normalizedService = serviceType.toLowerCase();

    if (normalizedService.includes('terraplenagem')) {
        message = `Olá *${leadName}*! Tudo bem? 🚜\n\nRecebemos seu interesse em *Terraplenagem* para *${city}*.\n\nTemos escavadeiras e rolos compactadores disponíveis para início imediato. Poderia nos enviar a topografia ou fotos do terreno para um orçamento rápido?`;
    }
    else if (normalizedService.includes('pavimentacao') || normalizedService.includes('asfalt')) {
        message = `Olá *${leadName}*! Tudo bem? 🚧\n\nSou da Divino Obras. Vimos que precisa de *Pavimentação* em *${city}*.\n\nTrabalhamos com CBUQ e asfalto frio de alta durabilidade. Qual seria a metragem aproximada da área?`;
    }
    else if (normalizedService.includes('drenagem') || normalizedService.includes('esgoto')) {
        message = `Olá *${leadName}*! Tudo bem? 💧\n\nRecebemos sua solicitação sobre *Drenagem/Saneamento* em *${city}*.\n\nNossa equipe de engenharia pode avaliar o projeto. Você já possui o projeto hidráulico ou precisa de uma visita técnica?`;
    }
    else {
        // Default
        message = `Olá *${leadName}*! Tudo bem? \n\nRecebemos seu contato pelo site da *Divino Obras* sobre *${serviceType}* em *${city}*.\n\nComo podemos ajudar com sua obra hoje?`;
    }

    return message;
}

export async function sendGroupNotification(leadData: any) {
    try {
        const dbInstance = await prisma.whatsappConfig.findFirst({
            where: { status: 'CONNECTED' }
        });

        const instanceName = dbInstance?.instanceName || process.env.EVOLUTION_INSTANCE_NAME;
        const apiKey = dbInstance?.apiKey || process.env.EVOLUTION_API_KEY;
        const baseUrl = process.env.EVOLUTION_API_URL;
        const GROUP_ID = "120363424805178147@g.us";

        if (!instanceName || !baseUrl || !apiKey) return false;

        const message = `Veio pelo formulário!
*NOVO LEAD*📢

*Nome:* ${leadData.name}
*Cidade:* ${leadData.city}
*Urgência:* ${leadData.urgency}
*Whatsapp:* https://wa.me/${leadData.whatsapp.replace(/\D/g, '')}
*Serviço Necessitado:* ${leadData.serviceType}`;

        await fetch(`${baseUrl}/message/sendText/${instanceName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            },
            body: JSON.stringify({
                number: GROUP_ID,
                text: message
            })
        });

        return true;
    } catch (error) {
        console.error('Error sending group notification:', error);
        return false;
    }
}
