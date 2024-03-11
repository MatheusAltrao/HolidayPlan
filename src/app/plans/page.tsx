import ContainerDiv from '@/components/ContainerDiv';
import Card from './components/card';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prismaClient from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const Plans = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    }

    const plans = await prismaClient.plans.findMany({
        where: {
            userId: session.user.id,
        },
    });

    return (
        <ContainerDiv>
            <div className='space-y-8'>
                <div className='flex items-center justify-between'>
                    <h2 className='title'>Your Plans</h2>
                    <Link href={'/newplan'}>
                        <Button
                            className='gap-2  font-bold  border-none bg-blue-600 hover:bg-blue-700'
                            variant={'outline'}
                        >
                            Add Plan
                            <Plus size={20} />
                        </Button>
                    </Link>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    {plans.length > 0 && plans.map((plan) => <Card plan={plan} key={plan.id} />)}
                </div>

                {plans.length == 0 && (
                    <p className='text-center text-zinc-400'>
                        You do not have any registered plan, click
                        <Link
                            className='text-blue-500 underline underline-offset-4'
                            href={'/newplan'}
                        >
                            {' '}
                            here{' '}
                        </Link>
                        to register your first plan.
                    </p>
                )}
            </div>
        </ContainerDiv>
    );
};

export default Plans;
