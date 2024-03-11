'use client';
import BackToHome from '@/components/backToHome/BackToHome';
import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import Skeleton from '@/components/skeleton/Skeleton';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { PlanProps } from '@/utils/plan.type';
import { Download, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import generatePDF, { Resolution, Margin, Options } from 'react-to-pdf';

const getTargetElement = () => document.getElementById('content-id');

const options: Options = {
    method: 'open',
    resolution: Resolution.HIGH,

    page: {
        margin: Margin.SMALL,
        format: 'letter',
        orientation: 'portrait',
    },
    canvas: {
        mimeType: 'image/png',
        qualityRatio: 1,
    },
};

interface PdfComponentProps {
    params: {
        id: string;
    };
}

const PdfComponent = ({ params }: PdfComponentProps) => {
    const [data, setData] = useState<PlanProps>();
    const [isPdfLoading, setIsPdfLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/createpdf/${params.id}`);
                setData(response.data.plan);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params.id]);

    const handleLoading = () => {
        setIsPdfLoading(true);
        setTimeout(() => {
            setIsPdfLoading(false);
        }, 3000);
    };

    const handlePreviewPdf = () => {
        generatePDF(getTargetElement, options);
        handleLoading();
    };

    return (
        <ContainerDiv>
            <div className='space-y-8'>
                <BackToHome href={`/plans/${params.id}`} />

                <div className='space-y-8'>
                    <div className='flex items-center justify-between'>
                        <h2 className='title'>Create PDF</h2>
                        <Button
                            onClick={handlePreviewPdf}
                            className=' font-bold  border-none bg-blue-600 hover:bg-blue-700'
                            variant={'outline'}
                        >
                            {isPdfLoading ? (
                                <div>
                                    {' '}
                                    <LoaderCircle className='animate-spin' size={20} />{' '}
                                </div>
                            ) : (
                                <div className='flex items-center gap-2 '>
                                    Download <Download size={20} />{' '}
                                </div>
                            )}
                        </Button>{' '}
                    </div>
                    <div className='p-4  bg-zinc-50 rounded' id='content-id'>
                        <div className='flex items-center justify-center'>
                            <div className='title text-center truncate text-zinc-900 w-40'>
                                <Skeleton content={data?.title} />
                            </div>
                        </div>

                        <div className='w-full h-px bg-zinc-400 my-8' />

                        <div
                            id='content-id'
                            className='p-8   rounded-lg bg-zinc-100   flex flex-col gap-8'
                        >
                            <div className=' flex items-center justify-between '>
                                <div className='flex items-center  gap-1    rounded-md '>
                                    <h2 className=' text-green-600 font-semibold text-lg '>
                                        Budget:
                                    </h2>

                                    <div>
                                        {data?.budget !== undefined || null ? (
                                            <p className='  rounded-md  text-zinc-950 '>
                                                {' '}
                                                {new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                }).format(Number(data?.budget))}
                                            </p>
                                        ) : (
                                            <div className='h-4 bg-zinc-300 rounded-md  animate-pulse w-20  '></div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_110px_110px] gap-8 lg:gap-2'>
                                <div className='space-y-1'>
                                    <p className='font-semibold text-zinc-600 text-sm'>Origin</p>
                                    <div className='  text-zinc-950'>
                                        <Skeleton content={data?.origin} />
                                    </div>
                                </div>
                                <div className='space-y-1'>
                                    <p className='font-semibold text-zinc-600 text-sm'>Destiny</p>
                                    <div className='  text-zinc-950'>
                                        {' '}
                                        <Skeleton content={data?.destiny} />
                                    </div>
                                </div>

                                <div className='space-y-1'>
                                    <p className='font-semibold text-zinc-600 text-sm'>
                                        Participants
                                    </p>
                                    <div className='  text-zinc-950'>
                                        <Skeleton content={data?.participants} />
                                    </div>
                                </div>
                                <div className='space-y-1'>
                                    <p className='font-semibold text-zinc-600 text-sm'>Check-in</p>
                                    <div className='  text-zinc-950'>
                                        <Skeleton content={data?.startDate} />
                                    </div>
                                </div>
                                <div className='space-y-1'>
                                    <p className='font-semibold text-zinc-600 text-sm'>Check-out</p>
                                    <div className='  text-zinc-950'>
                                        {' '}
                                        <Skeleton content={data?.endDate} />
                                    </div>
                                </div>
                            </div>

                            <div className='flex  flex-col gap-2'>
                                <h2 className='font-semibold text-2xl text-zinc-900'>
                                    Description
                                </h2>
                                <div className='text-zinc-500'>
                                    <Skeleton content={data?.description} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerDiv>
    );
};

export default PdfComponent;
