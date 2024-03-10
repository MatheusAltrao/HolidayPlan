import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import { authOptions } from '@/lib/auth';
import { ArrowLeft, Pen, StickyNote } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import prismaClient from '@/lib/prisma';
import { Button } from '@/components/ui/button';

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
            <div className='space-y-8'>
                <div className=' inline-block'>
                    <Link
                        href={'/trips'}
                        className='flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity'
                    >
                        <ArrowLeft size={20} /> <span>Voltar</span>
                    </Link>
                </div>

                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl  font-semibold truncate'>{trip?.title}</h1>
                        <div className='flex items-center justify-end gap-2'>
                            <Button
                                className='gap-2  font-bold  border-none bg-red-600 hover:bg-red-700'
                                variant={'outline'}
                            >
                                Gerar PDF <StickyNote size={18} />
                            </Button>
                            <Button
                                className='gap-2  font-bold  border-none bg-blue-600 hover:bg-blue-700'
                                variant={'outline'}
                            >
                                Editar <Pen size={18} />
                            </Button>
                        </div>
                    </div>

                    <div className='p-8   rounded-lg bg-zinc-100   flex flex-col gap-8'>
                        <div className=' flex items-center justify-between '>
                            <div className='flex items-center  gap-1 w-[220px] bg-green-400 px-2 py-1 rounded '>
                                <h2 className='text-zinc-900 font-semibold text-lg '>Orçamento:</h2>

                                <p className=' inline-block rounded  text-zinc-950 '>
                                    {' '}
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(Number(trip?.budget))}
                                </p>
                            </div>
                        </div>

                        <div className='grid grid-cols-[1fr_1fr_1fr_110px_110px] gap-2'>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Origem</p>
                                <div className=' rounded p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    teste
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Destino</p>
                                <div className=' rounded p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {trip?.local}
                                </div>
                            </div>

                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Participantes</p>
                                <div className=' rounded p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {trip?.participants}
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Data de ida</p>
                                <div className=' rounded p-2 h-10 border-zinc-400 border text-zinc-950'>
                                    {trip?.startDate}
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold text-zinc-600 text-sm'>Data de volta</p>
                                <div className=' rounded p-2 h-10 border-zinc-400 border text-zinc-950'>
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
