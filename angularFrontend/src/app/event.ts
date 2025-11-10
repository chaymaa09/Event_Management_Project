export interface Event {
    id: number;
    name: string;

    title: string;
    description: string;
    creationDate: string | Date;
    startDate: string | Date;
    endDate: string | Date;
    isPrivate: boolean;
    isVirtual: boolean;
    virtualLink: string;

    capacity: number | null; 
    waitingListEnabled: boolean;
    requiresApproval: boolean;


}
