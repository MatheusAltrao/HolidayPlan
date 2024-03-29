import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/providers/auth';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Holiday Plan',
    description: 'Planeja as suas férias com Holiday Plan ',
    icons: {
        icon: [
            {
                url: '/favicon.png',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <AuthProvider>
                <body
                    className={`${inter.className} dark flex flex-col flex-1 min-h-screen gap-4 `}
                >
                    <Header />
                    {children}
                </body>
            </AuthProvider>
        </html>
    );
}
