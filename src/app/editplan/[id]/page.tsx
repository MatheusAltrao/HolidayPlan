import BackToHome from '@/components/backToHome/BackToHome';
import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { X } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import UpdatePlanForm from '../components/UpdatePlanForm';
import prismaClient from '@/lib/prisma';
import Link from 'next/link';

interface EditPlanProps {
    params: {
        id: string;
    };
}

const EditPlan = async ({ params }: EditPlanProps) => {
    /*  const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/');
    } */

    const plan = await prismaClient.plans.findFirst({
        where: {
            id: params.id as string,
        },
    });

    return (
        <ContainerDiv>
            <div className='space-y-8'>
                <div className='space-y-4'>
                    <BackToHome />
                    <div className='flex items-center justify-between'>
                        <h2 className='title'>Editar Plano</h2>
                        <Link href={`/plans/${params.id}`}>
                            <Button
                                variant={'outline'}
                                className='bg-red-600 hover:bg-red-700 border-none gap-2'
                            >
                                Cancel <X size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>

                <UpdatePlanForm userId={params.id} plan={plan} />
            </div>
        </ContainerDiv>
    );
};

export default EditPlan;
