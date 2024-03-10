'use client';
import ContainerDiv from '@/components/containerDiv/ContainerDiv';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
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

    overrides: {
        pdf: {
            compress: true,
        },
        canvas: {
            useCORS: true,
        },
    },
};

interface PdfComponentProps {
    params: {
        id: string;
    };
}

const PdfComponent = ({ params }: PdfComponentProps) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/createpdf`, { params: { id: params.id } });
                setData(response.data); // Atualiza o estado com os dados recebidos da API
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <ContainerDiv>
            <div>
                <Button onClick={() => generatePDF(getTargetElement, options)}>Generate PDF</Button>
                <div className='p-4' id='content-id'>
                    <h1 className='text-zinc-950'>Content to be generated to PDF</h1>
                </div>
            </div>
        </ContainerDiv>
    );
};

export default PdfComponent;
