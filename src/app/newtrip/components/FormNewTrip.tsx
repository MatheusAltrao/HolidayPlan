'use client';
import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Input from './Input';

const schema = z.object({
    title: z.string().min(1, 'Título obrigatório'),
    local: z.string().min(1, 'Local obrigatório'),
    participants: z
        .string()
        .min(1, 'Participantes obrigatório.')
        .refine(
            (value) => /^\d+$/.test(value),
            "O campo 'Participantes' deve conter apenas números.",
        ),
    budget: z
        .string()
        .min(1, 'Orçamento obrigatório.')
        .refine((value) => /^\d+$/.test(value), 'O campo Orçamento deve conter apenas números.'),
    description: z.string().min(1, 'Coloque as informacoes sobre a viagem '),
});

type IFormData = z.infer<typeof schema>;

interface IFormNewTrip {
    userId: string;
}

const FormNewTrip = ({ userId }: IFormNewTrip) => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const router = useRouter();

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

    async function handleRegisterTrip(data: IFormData) {
        console.log(data);

        await api.post('/api/trips', {
            title: data.title,
            local: data.local,
            participants: data.participants,
            startDate: startDate?.toLocaleDateString(),
            endDate: endDate?.toLocaleDateString(),
            budget: data.budget,
            description: data.description,
            userId: userId,
        });
        router.replace('/trips');
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit(handleRegisterTrip)} className='w-full  space-y-8 '>
            <div className='gap-4 grid grid-cols-2 w-full'>
                <div className='space-y-2 w-full col-span-2'>
                    <label>
                        <p>Título</p>
                    </label>

                    <Input
                        name='title'
                        type='text'
                        placeholder='Viajem de aniversário'
                        error={errors.title?.message}
                        register={register}
                    />
                </div>
                <div className='space-y-2 w-full'>
                    <label>
                        <p>Local</p>
                    </label>

                    <Input
                        name='local'
                        type='text'
                        placeholder='Brasil'
                        error={errors.local?.message}
                        register={register}
                    />
                </div>
                <div className='space-y-2 w-full'>
                    <label>
                        <p>Participantes</p>
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
                        <p>Data de ida </p>
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
                                className='rounded '
                            />
                        </PopoverContent>
                    </Popover>
                </div>{' '}
                <div className='space-y-2 w-full'>
                    <label>
                        <p>Data de volta </p>
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
                                className='rounded '
                                fromDate={startDate}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='space-y-2 w-full col-span-2'>
                    <label>
                        <p>Orçamento</p>
                    </label>

                    <Input
                        name='budget'
                        type='string'
                        placeholder='R$ 2500,00'
                        error={errors.budget?.message}
                        register={register}
                    />
                </div>
                <div className='space-y-2 w-full col-span-2 '>
                    <label>
                        <p>Descrição</p>
                    </label>

                    <div className='space-y-1 w-full'>
                        <textarea
                            {...register('description')}
                            placeholder='Visitar os monumentos e ...'
                            className='w-full placeholder:text-zinc-400 bg-zinc-900 focus:outline-none rounded p-2 h-[140px] resize-none  '
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
                type='submit'
                variant={'outline'}
                className='w-full h-10 bg-blue-600 hover:bg-blue-700 font-bold text-lg gap-2 '
            >
                Adicionar Viagem <Plane />
            </Button>
        </form>
    );
};

export default FormNewTrip;
