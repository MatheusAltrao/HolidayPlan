import Image from 'next/image';
import Travelling from '../assets/travelling.svg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Home() {
    return (
        <main className=' flex items-center justify-center text-center flex-col flex-1 h-full gap-8 overflow-hidden '>
            <div className='-mt-20 flex flex-col gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-blue-600'>
                        Viagens para todos os gostos.
                    </h1>
                    <p className='text-base text-zinc-400'>
                        Organize suas viajens com HolidayPlan.
                    </p>
                </div>

                <Link href={'/trips'}>
                    <Button
                        className='gap-2  font-bold  border-none bg-blue-600 hover:bg-blue-700'
                        variant={'outline'}
                    >
                        Adicionar Viagem <Plus size={20} />
                    </Button>
                </Link>
            </div>

            <Image width={500} height={500} src={Travelling} alt='' />
        </main>
    );
}
