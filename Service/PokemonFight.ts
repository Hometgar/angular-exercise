import {Pokemon} from "../models/Pokemon";

export class PokemonFight {
    constructor(
        private pokemon1:Pokemon,
        private pokemon2:Pokemon
    ){}

    get fightOrder(){
        return [this.pokemon1, this.pokemon2].sort(((a, b) => b.speed - a.speed))
    }
}
