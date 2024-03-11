'use client';

import { Button } from '@/components/ui/button';
import { CalendarCheck, LoaderCircle, Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Input from '../../../components/Input';

const schema = z.object({
    title: z.string().min(1, 'Required Title.'),
    origin: z.string().min(1, 'Required Origin.'),
    destiny: z.string().min(1, 'Required Destiny.'),
    participants: z
        .string()
        .min(1, 'Required Participants.')
        .refine(
            (value) => /^\d+$/.test(value),
            "The field 'participants' must contain only numbers.",
        ),
    budget: z
        .string()
        .min(1, 'Required Budget.')
        .refine((value) => /^\d+$/.test(value), "The field 'Budget' must contain only numbers."),
    description: z.string().min(1, 'Enter information about the plan '),
});

type IFormData = z.infer<typeof schema>;

interface FormNewPlanProps {
    userId: string;
}

const FormNewPlan = ({ userId }: FormNewPlanProps) => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (startDate) {
            const minDate = new Date(startDate.getTime());
            minDate.setDate(minDate.getDate() + 1);
            setEndDate(minDate);
        }
    }, [startDate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>({
        resolver: zodResolver(schema),
    });

    async function handleRegisterPlan(data: IFormData) {
        setIsLoading(true);
        try {
            await api.post('/api/plans', {
                title: data.title,
                origin: data.origin,
                destiny: data.destiny,
                participants: data.participants,
                startDate: startDate?.toLocaleDateString(),
                endDate: endDate?.toLocaleDateString(),
                budget: data.budget,
                description: data.description,
                userId: userId,
            });
            router.replace('/plans');
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleRegisterPlan)} className='w-full  space-y-8 pb-8 '>
            <div className='gap-4 grid grid-cols-2 w-full'>
                <div className='space-y-2 w-full col-span-2'>
                    <label>
                        <p>Title</p>
                    </label>

                    <Input
                        name='title'
                        type='text'
                        placeholder='Trip with friends'
                        error={errors.title?.message}
                        register={register}
                    />
                </div>
                <div className='space-y-2 w-full col-span-2'>
                    <label>
                        <p>Budget</p>
                    </label>

                    <Input
                        name='budget'
                        type='string'
                        placeholder='$2,500.00'
                        error={errors.budget?.message}
                        register={register}
                    />
                </div>
                <div className='space-y-2 w-full col-span-2'>
                    <label>
                        <p>Participants</p>
                    </label>

                    <Input
                        name='participants'
                        type='number'
                        placeholder='2'
                        error={errors.participants?.message}
                        register={register}
                    />
                </div>
                <div className='space-y-2 w-full'>
                    <label>
                        <p>Origin</p>
                    </label>

                    <Input
                        name='origin'
                        type='text'
                        placeholder='Brazil'
                        error={errors.origin?.message}
                        register={register}
                    />
                </div>
                <div className='space-y-2 w-full'>
                    <label>
                        <p>Destiny</p>
                    </label>

                    <Input
                        name='destiny'
                        type='text'
                        placeholder='Portugal'
                        error={errors.destiny?.message}
                        register={register}
                    />
                </div>
                <div className='space-y-2 w-full'>
                    <label>
                        <p>Check-in</p>
                    </label>

                    <Popover>
                        <PopoverTrigger className='w-full'>
                            <div className='input w-full '>
                                {startDate == undefined ? (
                                    <div className='flex items-center justify-between '>
                                        <p className='text-zinc-400'>Selecione uma data de ida</p>
                                        <CalendarCheck size={20} />
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-between '>
                                        <p>{startDate?.toLocaleDateString()}</p>
                                        <CalendarCheck size={20} />
                                    </div>
                                )}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className='flex items-center justify-center'>
                            {' '}
                            <Calendar
                                required
                                mode='single'
                                selected={startDate}
                                onSelect={setStartDate}
                                fromDate={new Date()}
                                className='rounded-md '
                            />
                        </PopoverContent>
                    </Popover>
                </div>{' '}
                <div className='space-y-2 w-full'>
                    <label>
                        <p>Check-out</p>
                    </label>

                    <Popover>
                        <PopoverTrigger className='w-full '>
                            <div className='input w-full '>
                                {endDate == undefined ? (
                                    <div className='flex items-center justify-between '>
                                        <p className='text-zinc-400'>Selecione uma data de volta</p>
                                        <CalendarCheck size={20} />
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-between '>
                                        <p>{endDate?.toLocaleDateString()}</p>
                                        <CalendarCheck size={20} />
                                    </div>
                                )}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className='flex items-center justify-center'>
                            {' '}
                            <Calendar
                                required
                                mode='single'
                                selected={endDate}
                                onSelect={setEndDate}
                                className='rounded-md '
                                fromDate={startDate}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='space-y-2 w-full col-span-2 '>
                    <label>
                        <p>Description</p>
                    </label>

                    <div className='space-y-1 w-full'>
                        <textarea
                            {...register('description')}
                            placeholder='Take documents and ...'
                            className='w-full placeholder:text-zinc-400 bg-zinc-900 focus:outline-none rounded-md p-2 h-[140px] resize-none  '
                        />

                        {errors.description && (
                            <p className='text-sm font-medium text-red-500'>
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Button
                disabled={isLoading}
                type='submit'
                variant={'outline'}
                className='w-full h-10 bg-blue-600 hover:bg-blue-700 font-bold text-lg gap-2 border-none '
            >
                {isLoading ? (
                    <div>
                        <LoaderCircle className='animate-spin' size={20} />
                    </div>
                ) : (
                    <div className='flex items-center gap-2'>
                        {' '}
                        Add Plan <Plane />
                    </div>
                )}
            </Button>
        </form>
    );
};

export default FormNewPlan;
