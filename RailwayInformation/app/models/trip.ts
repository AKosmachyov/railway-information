import { RoutePoint } from "./routepoint";
import { Carriage } from "./carriage";

export class Trip {
    constructor (
        public route: [RoutePoint],
        public trainNumber: String,
        public carriages: [Carriage]
    ) { }   
}