import ContainerDiv from '@/components/ContainerDiv';
import NewPlanForm from './components/NewPlanForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BackToHome from '@/components/BackToHome';

const NewPlans = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    }

    return (
        <ContainerDiv>
            <div className='space-y-8'>
                <BackToHome href='/plans' />
                <div className='flex items-center justify-between'>
                    <h2 className='title'>Create new Plan</h2>
                </div>

                <NewPlanForm userId={session.user.id} />
            </div>
        </ContainerDiv>
    );
};

export default NewPlans;
