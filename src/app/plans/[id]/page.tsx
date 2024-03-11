import ContainerDiv from '@/components/ContainerDiv';
import { authOptions } from '@/lib/auth';
import { Pen, StickyNote } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prismaClient from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import BackToHome from '@/components/BackToHome';
import Link from 'next/link';

interface GetplanByIdProps {
    params: {
        id: string;
    };
}

const GetPlanById = async ({ params }: GetplanByIdProps) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    }

    const plan = await prismaClient.plans.findFirst({
        where: {
            userId: session.user.id,
            id: params.id,
        },
    });

    return (
        <ContainerDiv>
            <div className='space-y-8'>
                <BackToHome href='/plans' />

                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h1 className='title truncate'>{plan?.title}</h1>
                        <div className='flex items-center justify-end gap-2'>
                            <Link href={`/createpdf/${plan?.id}`}>
                                <Button
                                    className='gap-2  font-bold  border-none bg-red-600 hover:bg-red-700'
                                    variant={'outline'}
                                >
                                    Generate PDF <StickyNote size={18} />
                                </Button>
                            </Link>

                            <Link href={`/editplan/${plan?.id}`}>
                                <Button
                                    className='gap-2  font-bold  border-none bg-blue-600 hover:bg-blue-700'
                                    variant={'outline'}
                                >
                                    Edit <Pen size={18} />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div
                        id='content-id'
                        className='p-8   rounded-lg bg-zinc-100   flex flex-col gap-8'
                    >
                        <div className=' flex items-center justify-between '>
                            <div className='flex items-center  gap-1 rounded-md '>
                                <h2 className='text-zinc-900 font-semibold text-lg '>Budget:</h2>

                                <p className=' inline-block rounded-md  bg-green-400 p-1 text-zinc-950 '>
                                    {' '}
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(Number(plan?.budget))}
                                </p>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_110px_110px] gap-2'>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Origin</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {plan?.origin}
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Destiny</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {plan?.destiny}
                                </div>
                            </div>

                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Participants</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {plan?.participants}
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Check-in</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {plan?.startDate}
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Check-out</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {plan?.endDate}
                                </div>
                            </div>
                        </div>

                        <div className='flex  flex-col gap-2'>
                            <h2 className='font-semibold text-2xl text-zinc-900'>Description</h2>
                            <p className=' text-zinc-600 '>{plan?.description}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerDiv>
    );
};

export default GetPlanById;
