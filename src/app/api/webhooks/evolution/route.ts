import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Evolution API Webhook Handler
// EVENT: MESSAGES_UPSERT — Auto-moves NEW leads to QUOTING when they reply on WhatsApp
export async function POST(request: Request) {
    try {
        const body = await request.json();

        console.log('[Webhook] Received event:', body?.event);

        // 1. Basic Validation
        if (!body || !body.event) {
            return NextResponse.json({ received: true, error: 'no event' }, { status: 200 });
        }

        const eventType = body.event.toLowerCase();

        if (eventType !== 'messages.upsert') {
            return NextResponse.json({ received: true, event: body.event }, { status: 200 });
        }

        const messageData = body.data;
        if (!messageData || !messageData.key) {
            return NextResponse.json({ received: true }, { status: 200 });
        }

        // 2. Only process incoming messages (fromMe = false)
        if (messageData.key.fromMe) {
            return NextResponse.json({ ignored: true, reason: 'outgoing' }, { status: 200 });
        }

        // 3. Extract and clean phone number
        const remoteJid = messageData.key.remoteJid;
        if (!remoteJid || remoteJid.includes('@g.us')) {
            // Ignore group messages
            return NextResponse.json({ ignored: true, reason: 'group or no jid' }, { status: 200 });
        }

        // Clean phone: "5512981064529@s.whatsapp.net" → "5512981064529"
        const cleanPhone = remoteJid.replace('@s.whatsapp.net', '').split(':')[0];

        console.log(`[Webhook] Incoming message from: ${cleanPhone}`);

        // 4. Find Lead — try multiple phone formats for flexible matching
        const phoneNoCountry = cleanPhone.startsWith('55') ? cleanPhone.slice(2) : cleanPhone;

        const phoneVariants = [
            cleanPhone,                                             // Raw: 5512981064529
            phoneNoCountry,                                         // No Country: 12981064529
            `55${phoneNoCountry}`,                                  // Force Country: 5512981064529
            phoneNoCountry.length === 11 && phoneNoCountry[2] === '9'
                ? phoneNoCountry.slice(0, 2) + phoneNoCountry.slice(3) // Handle 9 digit (remove 9): 1281064529
                : phoneNoCountry
        ];

        // Unique variants only
        const uniqueVariants = [...new Set(phoneVariants)];

        console.log(`[Webhook] Looking for lead with status NEW and phones: ${uniqueVariants.join(', ')}`);

        const lead = await prisma.lead.findFirst({
            where: {
                contact: { in: uniqueVariants },
                status: 'NEW'
            }
        });

        if (lead) {
            console.log(`[Webhook] Lead found: ${lead.name} (${lead.id}). Moving NEW → QUOTING.`);

            // 5. Update Status to QUOTING
            await prisma.lead.update({
                where: { id: lead.id },
                data: {
                    status: 'QUOTING',
                    updatedAt: new Date()
                }
            });

            // 6. Revalidate Admin Pages for real-time Kanban update
            revalidatePath('/admin');
            revalidatePath('/admin/leads');

            return NextResponse.json({
                success: true,
                moved: true,
                leadId: lead.id,
                from: 'NEW',
                to: 'QUOTING'
            }, { status: 200 });
        } else {
            console.log(`[Webhook] No NEW lead found for phone variants: ${phoneVariants.join(', ')}`);
            return NextResponse.json({ ignored: true, reason: 'Lead not found or not NEW' }, { status: 200 });
        }

    } catch (error) {
        console.error('[Webhook] Error:', error);
        // Always return 200 to prevent Evolution from retrying endlessly
        return NextResponse.json({ error: 'Internal Error' }, { status: 200 });
    }
}
