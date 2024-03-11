import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import { authOptions } from '@/lib/auth';
import { Pen, StickyNote } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prismaClient from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import BackToHome from '@/components/backToHome/BackToHome';
import Link from 'next/link';

interface GetTripByIdProps {
    params: {
        id: string;
    };
}

const GetTripById = async ({ params }: GetTripByIdProps) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    }

    const trip = await prismaClient.trips.findFirst({
        where: {
            userId: session.user.id,
            id: params.id,
        },
    });

    return (
        <ContainerDiv>
            <div className='space-y-4'>
                <BackToHome />

                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h1 className='title truncate'>{trip?.title}</h1>
                        <div className='flex items-center justify-end gap-2'>
                            <Link href={`/createpdf/${trip?.id}`}>
                                <Button
                                    className='gap-2  font-bold  border-none bg-red-600 hover:bg-red-700'
                                    variant={'outline'}
                                >
                                    Gerar PDF <StickyNote size={18} />
                                </Button>
                            </Link>

                            <Button
                                className='gap-2  font-bold  border-none bg-blue-600 hover:bg-blue-700'
                                variant={'outline'}
                            >
                                Editar <Pen size={18} />
                            </Button>
                        </div>
                    </div>

                    <div
                        id='content-id'
                        className='p-8   rounded-lg bg-zinc-100   flex flex-col gap-8'
                    >
                        <div className=' flex items-center justify-between '>
                            <div className='flex items-center  gap-1 w-[220px] bg-green-400 px-2 py-1 rounded-md '>
                                <h2 className='text-zinc-900 font-semibold text-lg '>Orçamento:</h2>

                                <p className=' inline-block rounded-md  text-zinc-950 '>
                                    {' '}
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(Number(trip?.budget))}
                                </p>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_110px_110px] gap-2'>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Origem</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {trip?.destiny}
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Destino</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {trip?.origin}
                                </div>
                            </div>

                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Participantes</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {trip?.participants}
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Data de ida</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {trip?.startDate}
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Data de volta</p>
                                <div className=' rounded-md p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {trip?.endDate}
                                </div>
                            </div>
                        </div>

                        <div className='flex  flex-col gap-2'>
                            <h2 className='font-semibold text-2xl text-zinc-900'>Descrição</h2>
                            <p className=' text-zinc-600 '>{trip?.description}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerDiv>
    );
};

export default GetTripById;
