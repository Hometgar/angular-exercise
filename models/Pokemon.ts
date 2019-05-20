export class Pokemon {

    constructor(
        public name:string,
        public hp: number,
        public attack: number,
        public defense: number,
        public specialAttack: number,
        public specialDefense: number,
        public speed: number
    ){}

    toString(){
        return JSON.stringify(this);
    }
}
