import { Station } from './station';

export class Ticket {
    public id: number;
    public docId: number;
    public userName: string;
    public tripDirection: string;
    public carriage: string;
    public carriageType: string;
    public fromStation: Station;
    public fromDepart: Date;
    public toStation: Station;
    public DateTime: Date;
    public price: number;
    public uiId: string;
}