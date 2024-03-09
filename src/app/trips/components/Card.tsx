import { Button } from '@/components/ui/button';
import { ITrip } from '@/utils/trip.type';
import { MapPin, Trash, Users } from 'lucide-react';
import Link from 'next/link';

interface ICard {
    trip: ITrip;
}

const Card = ({ trip }: ICard) => {
    return (
        <Link
            href={'/trips/123'}
            className='rounded p-4 border border-zinc-800  w-full flex flex-col gap-4  hover:border-zinc-500 transition-colors'
        >
            <div className='flex justify-between'>
                <div className='space-y-0.5'>
                    <p className='text-xs text-zinc-400'>
                        {trip.startDate} - {trip.endDate}
                    </p>
                    <h3 className='text-xl font-bold '>{trip.title}</h3>{' '}
                </div>

                <Button
                    title='Apagar viajem'
                    className='hover:text-red-600'
                    size={'icon'}
                    variant={'outline'}
                >
                    <Trash size={20} />
                </Button>
            </div>

            <p className='text-zinc-500 text-sm break-words h-[50px] '>
                {trip.description.slice(0, 60)} ...
            </p>

            <div className='flex items-center justify-between text-zinc-100'>
                <div className='flex items-center gap-1'>
                    <MapPin size={16} />
                    <p>{trip.local}</p>
                </div>

                <div className='flex items-center gap-1'>
                    <Users size={16} />
                    <span>{trip.participants}</span>
                </div>
            </div>
        </Link>
    );
};

export default Card;
