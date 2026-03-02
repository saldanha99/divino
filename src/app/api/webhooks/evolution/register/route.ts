import { NextResponse } from 'next/server';

/**
 * POST /api/webhooks/evolution/register
 * 
 * Registers the webhook URL with the Evolution API instance.
 * Call this once after deployment to enable automatic kanban updates.
 * 
 * Security: Uses the same API key as the Evolution instance.
 */
export async function POST() {
    try {
        const baseUrl = process.env.EVOLUTION_API_URL;
        const apiKey = process.env.EVOLUTION_API_KEY;
        const instanceName = process.env.EVOLUTION_INSTANCE_NAME;

        if (!baseUrl || !apiKey || !instanceName) {
            return NextResponse.json({
                error: 'Missing environment variables',
                required: ['EVOLUTION_API_URL', 'EVOLUTION_API_KEY', 'EVOLUTION_INSTANCE_NAME'],
                currentValues: {
                    EVOLUTION_API_URL: baseUrl ? '✅' : '❌',
                    EVOLUTION_API_KEY: apiKey ? '✅' : '❌',
                    EVOLUTION_INSTANCE_NAME: instanceName ? '✅' : '❌',
                }
            }, { status: 400 });
        }

        // Use the production domain
        const webhookUrl = 'https://divinoterraplanagem.vercel.app/api/webhooks/evolution';

        console.log(`[Webhook Register] Registering webhook at: ${webhookUrl}`);
        console.log(`[Webhook Register] Instance: ${instanceName}`);

        // Register with Evolution API (v2 requires /set/ endpoint and nested webhook object)
        const response = await fetch(`${baseUrl}/webhook/set/${instanceName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            },
            body: JSON.stringify({
                webhook: {
                    url: webhookUrl,
                    enabled: true,
                    webhook_by_events: false,
                    webhook_base64: false,
                    events: [
                        'MESSAGES_UPSERT',
                    ]
                }
            })
        });

        const result = await response.text();

        if (!response.ok) {
            console.error('[Webhook Register] Failed:', result);
            return NextResponse.json({
                success: false,
                status: response.status,
                error: result,
                webhookUrl,
                instanceName
            }, { status: 500 });
        }

        console.log('[Webhook Register] Success:', result);

        return NextResponse.json({
            success: true,
            message: 'Webhook registered successfully',
            webhookUrl,
            instanceName,
            events: ['MESSAGES_UPSERT'],
            evolutionResponse: result
        });

    } catch (error) {
        console.error('[Webhook Register] Error:', error);
        return NextResponse.json({
            success: false,
            error: String(error)
        }, { status: 500 });
    }
}

/**
 * GET /api/webhooks/evolution/register
 * Returns the current webhook configuration status
 */
export async function GET() {
    const baseUrl = process.env.EVOLUTION_API_URL;
    const apiKey = process.env.EVOLUTION_API_KEY;
    const instanceName = process.env.EVOLUTION_INSTANCE_NAME;

    if (!baseUrl || !apiKey || !instanceName) {
        return NextResponse.json({
            configured: false,
            missing: {
                EVOLUTION_API_URL: !baseUrl,
                EVOLUTION_API_KEY: !apiKey,
                EVOLUTION_INSTANCE_NAME: !instanceName,
            }
        });
    }

    try {
        // Fetch current webhook config from Evolution
        const response = await fetch(`${baseUrl}/webhook/find/${instanceName}`, {
            headers: { 'apikey': apiKey }
        });

        if (!response.ok) {
            return NextResponse.json({
                configured: true,
                webhookStatus: 'unknown',
                error: await response.text()
            });
        }

        const webhookConfig = await response.json();

        return NextResponse.json({
            configured: true,
            instanceName,
            webhook: webhookConfig
        });
    } catch (error) {
        return NextResponse.json({
            configured: true,
            webhookStatus: 'error',
            error: String(error)
        });
    }
}
