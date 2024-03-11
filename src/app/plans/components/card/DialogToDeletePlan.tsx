'use client';

import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { api } from '@/lib/api';
import { PlanProps } from '@/utils/plan.type';
import { Trash, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DialogToDeletePlanProps {
    plan: PlanProps;
}

const DialogToDeletePlan = ({ plan }: DialogToDeletePlanProps) => {
    const router = useRouter();

    async function handleDeletePlan() {
        try {
            await api.delete('/api/plans', {
                params: {
                    id: plan.id,
                },
            });

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                {' '}
                <div
                    title='Apagar plano'
                    className='hover:text-red-600 transition-colors h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-md   '
                >
                    <Trash size={20} />
                </div>
            </DialogTrigger>
            <DialogContent>
                <div className='space-y-8'>
                    <div>
                        <h2 className='text-2xl font-semibold'>Aviso Importante:</h2>

                        <p className='text-zinc-400'>
                            Ao prosseguir com esta ação, você está prestes a excluir permanentemente
                            o plano. Essa ação é irreversível e não poderá ser desfeita.
                            Certifique-se de que você realmente deseja prosseguir com a exclusão
                            antes de continuar.
                        </p>
                    </div>

                    <div className='flex items-center justify-center gap-4'>
                        <DialogClose>
                            <div className='gap-2  flex items-center justify-center h-10  lg:px-4 lg:py-2  px-2 py-1 font-semibold border-zinc-800 rounded-md  border bg-transparent hover:bg-zinc-800 '>
                                Cancelar <X size={18} />{' '}
                            </div>
                        </DialogClose>

                        <DialogClose onClick={handleDeletePlan}>
                            <div className='gap-2  flex items-center justify-center h-10  lg:px-4 lg:py-2  px-2 py-1 font-semibold border-zinc-800 rounded-md  border  bg-red-600 hover:bg-red-700 '>
                                Apagar <Trash size={18} />{' '}
                            </div>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogToDeletePlan;
