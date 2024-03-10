export interface TripProps {
    id: string;
    title: string;
    origin: string;
    destiny: string;
    description: string;
    startDate?: string | null;
    endDate?: string | null;
    badge?: string | null;
    participants: string | null;
    userId: string | null;
}
