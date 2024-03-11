import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const BackToHome = () => {
    return (
        <div className=' inline-block'>
            <Link
                href={'/plans'}
                className='flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity'
            >
                <ArrowLeft size={20} /> <span>Voltar</span>
            </Link>
        </div>
    );
};

export default BackToHome;
