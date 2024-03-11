import Image from 'next/image';
import Travelling from '../assets/travelling.svg';

export default function Home() {
    return (
        <main className=' flex items-center justify-center text-center flex-col flex-1 h-full gap-8 overflow-hidden '>
            <div className='-mt-20 flex flex-col gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-blue-600'>Plans with HolidayPlan</h1>
                    <p className='text-base text-zinc-400'>
                        Organize your vacation with HolidayPlan..
                    </p>
                </div>
            </div>

            <Image width={500} height={500} src={Travelling} alt='' />
        </main>
    );
}
