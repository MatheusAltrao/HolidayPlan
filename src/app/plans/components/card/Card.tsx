import { Button } from '@/components/ui/button';
import { PlanProps } from '@/utils/plan.type';
import { Eye, MapPin, Trash, Users, X } from 'lucide-react';
import Link from 'next/link';
import DialogToDeletePlan from './DialogToDeletePlan';

interface CardProps {
    plan: PlanProps;
}

const Card = ({ plan }: CardProps) => {
    return (
        <div className='rounded-md  p-4 border border-zinc-800  w-full flex flex-col gap-4  hover:border-zinc-500 transition-colors'>
            <div className='grid grid-cols-3 '>
                <div className='space-y-0.5 col-span-2  w-full'>
                    <p className='text-sm text-zinc-400'>
                        {plan.startDate} - {plan.endDate}
                    </p>
                    <p className='text-xl font-bold truncate  '>{plan.title}</p>{' '}
                </div>

                <div className='flex items-center gap-2 ml-auto'>
                    <Link href={`/plans/${plan.id}`}>
                        <Button
                            title='See plan'
                            className='hover:text-blue-600'
                            size={'icon'}
                            variant={'outline'}
                        >
                            <Eye size={20} />
                        </Button>
                    </Link>

                    <DialogToDeletePlan plan={plan} />
                </div>
            </div>

            <p className='text-zinc-500 text-sm break-words h-[50px] '>
                {plan.description.slice(0, 60)} ...
            </p>

            <div className='flex items-center justify-between text-zinc-100'>
                <div className='flex items-center gap-1'>
                    <MapPin size={16} />
                    <p>{plan.destiny}</p>
                </div>

                <div className='flex items-center gap-1'>
                    <Users size={16} />
                    <span>{plan.participants}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
