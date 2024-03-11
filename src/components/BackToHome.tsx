import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BackToHomeProps {
    href: string;
}

const BackToHome = ({ href }: BackToHomeProps) => {
    return (
        <div className=' inline-block'>
            <Link
                href={href}
                className='flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity'
            >
                <ArrowLeft size={20} /> <span>Back</span>
            </Link>
        </div>
    );
};

export default BackToHome;
