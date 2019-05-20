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
   });

   describe('attack', ()=>{
       it('should decrease B.hp by A.attack - B.defense', ()=>{
           let pokemonA = new Pokemon("A", 5,2,1,1,1,0);
           let pokemonB = new Pokemon("B", 5,2,1,1,1,1);

           let fight = new PokemonFight(pokemonA, pokemonB);

           fight.makeAttack(pokemonA, pokemonB);

           expect(pokemonB.hp).toEqual(4)
       });

       it('should decrease B.hp by 1 even if A.attack == B.defense', ()=>{
           let pokemonA = new Pokemon("A", 5,2,1,1,1,0);
           let pokemonB = new Pokemon("B", 5,2,2,1,1,1);

           let fight = new PokemonFight(pokemonA, pokemonB);

           fight.makeAttack(pokemonA, pokemonB);

           expect(pokemonB.hp).toEqual(4)
       });

       it('should decrease B by 1 even if B.defense > A.attack', ()=>{
           let pokemonA = new Pokemon("A", 5,2,1,1,1,0);
           let pokemonB = new Pokemon("B", 5,2,5,1,1,1);

           let fight = new PokemonFight(pokemonA, pokemonB);

           fight.makeAttack(pokemonA, pokemonB);

           expect(pokemonB.hp).toEqual(4)
       })
   });

   describe('playAction', ()=>{
       it('A should attack B ', ()=>{
           let pokemonA = new Pokemon("A", 5,2,1,1,1,5);
           let pokemonB = new Pokemon("B", 5,2,5,1,1,1);

           let fight = new PokemonFight(pokemonA, pokemonB);

           fight.makeAttack = jest.fn();

           fight.playAction(pokemonA, [pokemonB]);

           expect(fight.makeAttack).toHaveBeenCalledWith(pokemonA, pokemonB);
       });

       it('Should return B is Dead', ()=>{
           let pokemonA = new Pokemon("A", 5,2,1,1,1,5);
           let pokemonB = new Pokemon("B", 1,2,0,1,1,1);

           let fight = new PokemonFight(pokemonA, pokemonB);

           fight.playAction(pokemonA, [pokemonB]);
           expect(pokemonB.hp).toEqual(-1);
       })
   });

    describe('playTurn', ()=>{
        it('playTurn should call playAction two times', ()=>{
            let pokemonA = new Pokemon("A", 5,2,1,1,1,5);
            let pokemonB = new Pokemon("B", 5,2,5,1,1,1);

            let fight = new PokemonFight(pokemonA, pokemonB);

            fight.playAction = jest.fn();

            fight.playTurn();
            expect(fight.playAction).toHaveBeenCalledTimes(2);

            // @ts-ignore
            expect(fight.playAction.mock.calls[0]).toEqual([pokemonA, [pokemonB]]);
            // @ts-ignore
            expect(fight.playAction.mock.calls[1]).toEqual([pokemonB, [pokemonA]]);
        });

        it('should return list of dead pokemon', ()=>{
            let pokemonA = new Pokemon("A", 5,2,1,1,1,5);
            let pokemonB = new Pokemon("B", 1,2,0,1,1,1);

            let fight = new PokemonFight(pokemonA, pokemonB);

            expect(fight.playTurn()).toEqual([pokemonB]);
        });
    })

    describe('fight', ()=>{
        it('should return a list of dead pokemon', ()=>{
            let pokemonA = new Pokemon("A", 5,2,1,1,1,5);
            let pokemonB = new Pokemon("B", 1,2,0,1,1,1);

            let fight = new PokemonFight(pokemonA, pokemonB);

            expect(fight.fight()).toEqual([pokemonB]);
        });
    })
});
