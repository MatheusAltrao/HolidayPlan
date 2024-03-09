import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const GetTripById = () => {
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

                <div>
                    <h1 className='text-2xl font-semibold'>Viagem de estudos</h1>
                </div>
            </div>
        </ContainerDiv>
    );
};

export default GetTripById;
