import { NextResponse } from 'next/server';
import { createSmartLead, SmartLeadData } from '@/actions/leads'; // Reusing established logic

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation matching SmartLeadData
        const leadData: SmartLeadData = {
            name: body.name,
            whatsapp: body.whatsapp,
            serviceType: body.serviceType,
            city: body.city,
            urgency: body.urgency,
        };

        if (!leadData.name || !leadData.whatsapp) {
            return NextResponse.json(
                { success: false, error: 'Nome e WhatsApp são obrigatórios.' },
                { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Reuse the same server action logic
        // Note: Server actions are tailored for React forms usually, but we can call the logic if it's separated
        // or just call the function directly if it's just a db call + util.
        // Importing `createSmartLead` from `@/actions/leads` works because it's just an async function on the server.
        const result = await createSmartLead(leadData);

        return NextResponse.json(result, {
            status: result.success ? 200 : 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Critical for WordPress on different domain
            },
        });

    } catch (error) {
        console.error('External Lead Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
        );
    }
}
