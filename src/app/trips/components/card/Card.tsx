import { Button } from '@/components/ui/button';

import { TripProps } from '@/utils/trip.type';
import { useRouter } from 'next/navigation';
import { Eye, MapPin, Trash, Users, X } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import DialogToDeleteTrip from './DialogToDeleteTrip';

interface CardProps {
    trip: TripProps;
}

const Card = ({ trip }: CardProps) => {
    return (
        <div className='rounded p-4 border border-zinc-800  w-full flex flex-col gap-4  hover:border-zinc-500 transition-colors'>
            <div className='flex justify-between'>
                <div className='space-y-0.5 w-full'>
                    <p className='text-sm text-zinc-400'>
                        {trip.startDate} - {trip.endDate}
                    </p>
                    <h3 className='text-xl font-bold truncate max-w-[240px]'>{trip.title}</h3>{' '}
                </div>

                <div className='flex items-center gap-2'>
                    <Link href={`/trips/${trip.id}`}>
                        <Button
                            title='Ver viagem'
                            className='hover:text-blue-600'
                            size={'icon'}
                            variant={'outline'}
                        >
                            <Eye size={20} />
                        </Button>
                    </Link>

                    <DialogToDeleteTrip trip={trip} />
                </div>
            </div>

            <p className='text-zinc-500 text-sm break-words h-[50px] '>
                {trip.description.slice(0, 60)} ...
            </p>

            <div className='flex items-center justify-between text-zinc-100'>
                <div className='flex items-center gap-1'>
                    <MapPin size={16} />
                    <p>{trip.destiny}</p>
                </div>

                <div className='flex items-center gap-1'>
                    <Users size={16} />
                    <span>{trip.participants}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
