import { RoutePoint } from "./routepoint";
import { CarriageType } from "./carriageType";

export class Trip {
    constructor(
        public direction: String,
        public from: RoutePoint,
        public to: RoutePoint,
        public trainNumber: String,
        public carriageType: [CarriageType]
    ) { }
}