import { LeadStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function sendWhatsappMessage(phone: string, message: string) {
    try {
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

        let formattedPhone = phone.replace(/\D/g, '');
        if (!formattedPhone.startsWith('55')) {
            formattedPhone = `55${formattedPhone}`;
        }

        console.log(`[WhatsApp] Sending to ${formattedPhone} via instance ${instanceName}`);

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
                console.error(`[WhatsApp] Evolution API Error (${response.status}):`, errorText);
                return false;
            }

            const data = await response.json();
            console.log('[WhatsApp] Success:', data);
            return true;
        } catch (error) {
            console.error('[WhatsApp] Fetch Error:', error);
            return false;
        }
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return false;
    }
}

export async function sendLeadNotification(leadName: string, serviceType: string, city: string) {
    const normalizedService = serviceType.toLowerCase();

    if (normalizedService.includes('terraplenagem')) {
        return `Olá *${leadName}*! Tudo bem? 🚜\n\nRecebemos seu interesse em *Terraplenagem* para *${city}*.\n\nTemos escavadeiras e rolos compactadores disponíveis para início imediato. Poderia nos enviar a topografia ou fotos do terreno para um orçamento rápido?`;
    }
    else if (normalizedService.includes('pavimentacao') || normalizedService.includes('asfalt')) {
        return `Olá *${leadName}*! Tudo bem? 🚧\n\nSou da Divino Obras. Vimos que precisa de *Pavimentação* em *${city}*.\n\nTrabalhamos com CBUQ e asfalto frio de alta durabilidade. Qual seria a metragem aproximada da área?`;
    }
    else if (normalizedService.includes('drenagem') || normalizedService.includes('esgoto')) {
        return `Olá *${leadName}*! Tudo bem? 💧\n\nRecebemos sua solicitação sobre *Drenagem/Saneamento* em *${city}*.\n\nNossa equipe de engenharia pode avaliar o projeto. Você já possui o projeto hidráulico ou precisa de uma visita técnica?`;
    }
    else {
        return `Olá *${leadName}*! Tudo bem? \n\nRecebemos seu contato pelo site da *Divino Obras* sobre *${serviceType}* em *${city}*.\n\nComo podemos ajudar com sua obra hoje?`;
    }
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

/**
 * Send WhatsApp message when a lead's status changes in the Kanban.
 * Each transition has a specific template message.
 */
export async function sendStatusChangeMessage(phone: string, leadName: string, newStatus: LeadStatus) {
    const firstName = leadName.split(' ')[0];

    const messages: Partial<Record<LeadStatus, string>> = {
        QUOTING: `Olá *${firstName}*! 📋\n\nEstamos preparando seu orçamento personalizado. Em breve nossa equipe entrará em contato com os detalhes e valores.\n\nSe tiver alguma dúvida, estamos à disposição! 😊`,

        APPROVED: `*${firstName}*, ótima notícia! ✅🎉\n\nSeu orçamento foi *aprovado*! Vamos iniciar o planejamento da obra.\n\nNossa equipe de engenharia entrará em contato para alinhar o cronograma e data de início.\n\nObrigado pela confiança na *Divino Obras*! 💛`,

        EXECUTING: `Olá *${firstName}*! 🚧🚜\n\nSua obra está *em andamento*!\n\nNossa equipe técnica já está no local com o maquinário alocado. Qualquer atualização será informada por aqui.\n\nPrecisando de algo, é só chamar! 💪`,

        COMPLETED: `*${firstName}*, temos uma ótima notícia! 🏁🎉\n\nSua obra foi *concluída com sucesso*!\n\nAgradecemos a parceria e confiança na *Divino Obras*. Se precisar de novos serviços no futuro, conte conosco!\n\n⭐ Se puder, deixe uma avaliação no Google — isso nos ajuda muito!\nhttps://g.page/r/divinolocacoes/review`,
    };

    const message = messages[newStatus];

    if (!message) {
        // No message for this status (e.g., NEW, LOST)
        console.log(`[Automation] No message template for status: ${newStatus}`);
        return false;
    }

    console.log(`[Automation] Sending ${newStatus} message to ${phone}`);
    return await sendWhatsappMessage(phone, message);
}
