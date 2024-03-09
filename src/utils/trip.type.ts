export interface ITrip {
    title: string;
    local: string;
    description: string;
    startDate?: string | null;
    endDate?: string | null;
    badge?: string | null;
    participants: string | null;
    userId: string | null;
}