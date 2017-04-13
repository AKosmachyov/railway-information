export class Carriage {
    constructor (
        public name: string,
        public seats: [string],
        public emptySeat: number,
        public type: string,
        public priceFactor: number,
        public price: number
    ) { }
    
}