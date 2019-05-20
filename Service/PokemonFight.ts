import {Pokemon} from "../models/Pokemon";

export class PokemonFight {
    turn:number = 0;
    pokemons:Pokemon[];

    constructor(
        ...pokemons:Pokemon[]
    ){
        this.pokemons = pokemons;
        let str = "new fight between ";

        pokemons.map((pok, index, array)=>{
            str += pok.name;
            if(index < array.length - 1)
                str += " and ";
        })
        console.log(str);
    }

    get fightOrder(){
        return this.pokemons.sort(((a, b) => b.speed - a.speed)).slice()
    }

    makeAttack(from:Pokemon, to:Pokemon){
        console.log(from.name + " attack : " + to.name);
        let damage = from.attack - to.defense;
        if(damage <= 0){
            console.log("it's not super effective");
            damage = 1;
        }

        console.log(to.name + " take : " + damage + "dp");
        to.hp -= damage;
        console.log(to.name + ' has ' + to.hp + "hp left");
    };

    playAction(actor: Pokemon, targets:Pokemon[], random = Math.random):void{
        this.makeAttack(actor, targets[Math.floor(random() * targets.length)]);
    }

    playTurn(): Pokemon[]|undefined{
        this.turn++;
        console.log("BEGIN TURN " + this.turn);
        let order = this.fightOrder;

        for(let pokeIndex in order){
            let actor = order[pokeIndex];
            let targets = this.pokemons.slice();
            targets.splice(this.pokemons.indexOf(actor),1);

            console.log(targets);
            this.playAction(actor, targets);

            let someDead = this.pokemons.filter((pok)=> pok.hp < 0);
            if(someDead.length > 0) {
                console.log("some pokemon died " + someDead);
                return someDead;
            }
        }

        console.log("END TURN " + this.turn);
    }

    fight(): Pokemon[]{
        let someDead;
        while (!someDead){
            someDead = this.playTurn();
        }

        return someDead;
    }
}
