import { Station } from './station';

export class RoutePoint {
    constructor (
        public tripTime: number,
        public stayTime: number,
        public station: String,
        public arrive: Date
    ) { }
}
