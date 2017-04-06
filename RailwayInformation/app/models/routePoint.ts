import { Station } from './station';

export class RoutePoint {
    constructor (
        public tripDistance: number,
        public stayTime: number,
        public station: Station,
        public arrive: string
    ) { }
}
