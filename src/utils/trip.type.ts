export interface TripProps {
    id: string;
    title: string;
    origin: string;
    destiny: string;
    description: string;
    startDate?: string | null;
    endDate?: string | null;
    budget?: string | null;
    participants: string | null;
    userId: string | null;
}
