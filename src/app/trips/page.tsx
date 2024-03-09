import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import Card from './components/card/Card';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prismaClient from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const Trips = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    }

    const trips = await prismaClient.trips.findMany({
        where: {
            userId: session.user.id,
        },
    });

    return (
        <ContainerDiv>
            <div className='space-y-8'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-2xl font-semibold'>Suas Viagens</h2>
                    <Link href={'/newtrip'}>
                        <Button
                            className='gap-2  font-bold  border-none bg-blue-600 hover:bg-blue-700'
                            variant={'outline'}
                        >
                            Adicionar Viagem <Plus size={20} />
                        </Button>
                    </Link>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {trips.length > 0 && trips.map((trip) => <Card trip={trip} key={trip.id} />)}
                </div>

                {trips.length == 0 && (
                    <p className='text-center text-zinc-400'>
                        Você não tem nenhuma viagem cadastrada, clique{' '}
                        <Link
                            className='text-blue-500 underline underline-offset-4'
                            href={'/newtrip'}
                        >
                            aqui
                        </Link>{' '}
                        para cadastrar a sua primeira viagem.
                    </p>
                )}
            </div>
        </ContainerDiv>
    );
};

export default Trips;
