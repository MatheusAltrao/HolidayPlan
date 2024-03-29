'use client';
import Link from 'next/link';
import { Button } from './ui/button';

import { signIn, useSession, signOut } from 'next-auth/react';
import { LoaderCircle, Lock, Plus, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const { status, data } = useSession();

    async function handleSignIn() {
        await signIn('google');
    }

    async function handleSignOut() {
        await signOut();
    }

    const pathname = usePathname();

    return (
        <header className='w-full mx-auto max-w-[1200px] p-4 '>
            <div className='flex items-center justify-between border-b border-zinc-800 py-4'>
                <div className='flex items-center gap-8'>
                    <div>
                        <Link href={'/'}>
                            <h1 className='title'>HolidayPlan</h1>
                        </Link>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    {status == 'authenticated' && (
                        <div className='flex items-center gap-2'>
                            <Link className={`${pathname !== '/' && 'hidden'}`} href={'/plans'}>
                                <Button
                                    className='gap-2  font-bold  border-none bg-blue-600 hover:bg-blue-700'
                                    variant={'outline'}
                                >
                                    Plans <Plus size={20} />
                                </Button>
                            </Link>
                            <Button onClick={handleSignOut} className='gap-2' variant={'outline'}>
                                {data.user?.name} <X size={16} />
                            </Button>
                        </div>
                    )}
                </div>

                {status == 'unauthenticated' && (
                    <Button onClick={handleSignIn} className=' gap-2' variant={'outline'}>
                        Sign in with Google <Lock className='-mt-1' size={16} />
                    </Button>
                )}

                {status == 'loading' && (
                    <Button variant={'outline'}>
                        <LoaderCircle className='animate-spin' size={16} />
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;
