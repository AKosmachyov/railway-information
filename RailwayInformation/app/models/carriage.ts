export class Carriage {
    constructor(
        public id: number,
        public number: number,
        public emptySeats: number,
        public carriageType: string,        
        public price: number
    ) { }
}