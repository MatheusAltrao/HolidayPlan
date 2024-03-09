import { ReactNode } from 'react';

const ContainerDiv = ({ children }: { children: ReactNode }) => {
    return <div className='w-full max-w-[1200px] mx-auto px-4'>{children}</div>;
};

export default ContainerDiv;
