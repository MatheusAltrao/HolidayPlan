import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import FormNewPlan from './components/FormNewPlan';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BackToHome from '@/components/backToHome/BackToHome';

const NewPlans = async () => {
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
                        <h2 className='title'>Criar novo Plano</h2>
                    </div>
                </div>

                <FormNewPlan userId={session.user.id} />
            </div>
        </ContainerDiv>
    );
};

export default NewPlans;
