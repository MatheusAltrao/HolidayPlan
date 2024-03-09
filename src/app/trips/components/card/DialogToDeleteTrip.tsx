'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { api } from '@/lib/api';
import { ITrip } from '@/utils/trip.type';
import { Trash, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IDialogToDeleteTrip {
    trip: ITrip;
}

const DialogToDeleteTrip = ({ trip }: IDialogToDeleteTrip) => {
    const router = useRouter();

    async function handleDeleteTrip() {
        try {
            await api.delete('/api/trips', {
                params: {
                    id: trip.id,
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
                <Button
                    title='Apagar viagem'
                    className='hover:text-red-600'
                    size={'icon'}
                    variant={'outline'}
                >
                    <Trash size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className='space-y-8'>
                    <div>
                        <h2 className='text-2xl font-semibold'>Aviso Importante:</h2>

                        <p className='text-zinc-400'>
                            Ao prosseguir com esta ação, você está prestes a excluir permanentemente
                            a viagem. Essa ação é irreversível e não poderá ser desfeita.
                            Certifique-se de que você realmente deseja prosseguir com a exclusão
                            antes de continuar.
                        </p>
                    </div>

                    <div className='flex items-center justify-center gap-4'>
                        <DialogClose>
                            <Button
                                className='gap-2 bg-blue-600 hover:bg-blue-700 h-10 border-none font-semibold'
                                variant={'outline'}
                            >
                                Cancelar <X size={18} />{' '}
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={handleDeleteTrip}
                            className='gap-2 font-semibold h-10'
                            variant={'outline'}
                        >
                            Apagar <Trash size={18} />{' '}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogToDeleteTrip;
