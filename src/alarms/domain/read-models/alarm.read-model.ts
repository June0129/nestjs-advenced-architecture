export class AlarmReadModel {
    id: string;
    name: string;
    serverity: string;
    triggeredAt: Date;
    isAcknowledged: boolean;
    items: Array<{
        name: string;
        type: string;
    }>;
}