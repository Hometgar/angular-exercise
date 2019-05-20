import {Pokemon} from "../../models/Pokemon";
import {PokemonFight} from "../../Service/PokemonFight";

describe("PokemonFight", ()=>{
   describe("getOrder", ()=>{
       it('Should return A then B where A.speed > B.speed and A insert before B', ()=>{
           let pokemonA = new Pokemon("A", 1,1,1,1,1,1);
           let pokemonB = new Pokemon("B", 1,1,1,1,1,0);

           let fight = new PokemonFight(pokemonA, pokemonB);

           expect(fight.fightOrder).toEqual([pokemonA, pokemonB]);
       });

       it('Should return A then B where A.speed > B.speed and B insert before A', ()=>{
           let pokemonA = new Pokemon("A", 1,1,1,1,1,1);
           let pokemonB = new Pokemon("B", 1,1,1,1,1,0);

           let fight = new PokemonFight(pokemonB, pokemonA);

           expect(fight.fightOrder).toEqual([pokemonA, pokemonB]);
       })

       it('Should return A then B where A.speed == B.speed and A insert before B', ()=>{
           let pokemonA = new Pokemon("A", 1,1,1,1,1,1);
           let pokemonB = new Pokemon("B", 1,1,1,1,1,1);

           let fight = new PokemonFight(pokemonA, pokemonB);

           expect(fight.fightOrder).toEqual([pokemonA, pokemonB]);
       })

       it('Should return B then A where A.speed == B.speed and B insert before A', ()=>{
           let pokemonA = new Pokemon("A", 1,1,1,1,1,1);
           let pokemonB = new Pokemon("B", 1,1,1,1,1,1);

           let fight = new PokemonFight(pokemonA, pokemonB);

           expect(fight.fightOrder).toEqual([pokemonA, pokemonB]);
       })
   })
});
