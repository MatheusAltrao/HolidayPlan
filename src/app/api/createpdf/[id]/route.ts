import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const planId = params.id;

    try {
        const plan = await prismaClient.plans.findFirst({
            where: {
                id: planId as string,
            },
        });

        if (!plan) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }
        return NextResponse.json({ plan: plan }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'bad request' }, { status: 400 });
    }
}
