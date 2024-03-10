import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import FormNewTrip from './components/FormNewTrip';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BackToHome from '@/components/backToHome/BackToHome';

const NewTrips = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    }

    return (
        <ContainerDiv>
            <div className='space-y-8'>
                <div className='space-y-4'>
                    <BackToHome />
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-semibold'>Criar nova viagem</h2>
                    </div>
                </div>

                <FormNewTrip userId={session.user.id} />
            </div>
        </ContainerDiv>
    );
};

export default NewTrips;
