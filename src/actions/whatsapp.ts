'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || '';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || '';

if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    console.error("Evolution API credentials not found in environment variables.");
}

// 1. Fetch Instances
export async function getWhatsappInstance() {
    try {
        const instance = await prisma.whatsappConfig.findFirst();
        return instance;
    } catch (error) {
        console.error("Error fetching instance:", error);
        return null;
    }
}

// 2. Create Instance
export async function createInstance(instanceName: string) {
    try {
        // 1. Call Evolution API to create instance
        const response = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
            method: 'POST',
            headers: {
                'apikey': EVOLUTION_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                instanceName: instanceName,
                qrcode: true
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle case where instance already exists (403 or similar)
            if (data?.error === 'Instance already exists') {
                // Check if it exists in our DB, if not, create it
                const existing = await prisma.whatsappConfig.findUnique({
                    where: { instanceName }
                });

                if (!existing) {
                    await prisma.whatsappConfig.create({
                        data: {
                            instanceName: instanceName,
                            status: 'DISCONNECTED', // Assume disconnected until verified
                            apiKey: data.hash?.apikey || null // Sometimes returned
                        }
                    });
                }
                return { success: true, message: "Instância já existia, registro atualizado.", data }; // Treat as success or handle as needed
            }
            console.error("Evolution API Error:", data);
            return { success: false, error: data.message || "Falha ao criar instância na API." };
        }

        // 2. Save to Database
        // Evolution API returns data like: { instance: { instanceName: '...', ... }, hash: { apikey: '...' }, qrcode: { base64: '...' } }
        // or just the instance info depending on version.

        await prisma.whatsappConfig.create({
            data: {
                instanceName: instanceName,
                status: 'DISCONNECTED',
                apiKey: data.hash?.apikey // Save the instance-specific key if provided
            }
        });

        return { success: true, data };

    } catch (error) {
        console.error("Server Action Error:", error);
        return { success: false, error: "Erro interno no servidor." };
    }
}

// 3. Connect Instance (Get QR Code)
export async function connectInstance(instanceName: string) {
    try {
        const response = await fetch(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
            method: 'GET',
            headers: {
                'apikey': EVOLUTION_API_KEY
            }
        });

        const data = await response.json();

        // Evolution API returns { base64: '...' } or similar for QR
        if (data && data.base64) {
            return { success: true, qrcode: data.base64 };
        } else if (data && data.instance && data.instance.state === 'open') {
            // Already connected
            await prisma.whatsappConfig.update({
                where: { instanceName },
                data: { status: 'CONNECTED' }
            });
            return { success: true, status: 'CONNECTED' };
        }

        return { success: false, error: "Falha ao obter QR Code." };

    } catch (error) {
        console.error("Connect Error:", error);
        return { success: false, error: "Erro ao conectar instância." };
    }
}


// 4. Logout / Delete Instance
export async function logoutInstance(instanceName: string) {
    try {
        // 1. Logout from API
        await fetch(`${EVOLUTION_API_URL}/instance/logout/${instanceName}`, {
            method: 'DELETE', // Check docs: usually DELETE /instance/logout/{name}
            headers: {
                'apikey': EVOLUTION_API_KEY
            }
        });

        // 2. Delete from DB (or update status)
        await prisma.whatsappConfig.delete({
            where: { instanceName }
        });

        return { success: true };

    } catch (error) {
        console.error("Logout Error:", error);
        return { success: false, error: "Erro ao remover instância." };
    }
}
