import { IPokemon, IPokemonName } from "../app/i-pokemon";
import { PokemonService } from "../app/pokemon.service";
import { bulbasor } from "./bulbasour";
interface iOutput{
    service: Pick<PokemonService, keyof PokemonService>,
    getAllPokemon:jasmine.Spy,
    getPokemonFromById:jasmine.Spy,
}
const makeFakePokemonService=()=>{
    const fakeService:Pick<PokemonService, keyof PokemonService> = {
    getAllPokemon(): Promise<IPokemonName[]> {
      return Promise.resolve([{name:"test", id:"1", url:""}])
    },
    getPokemonFromById(id:string): Promise<IPokemon>{
      return Promise.resolve({...bulbasor})
    },
    }
    const getAllPokemon = spyOn(fakeService, 'getAllPokemon').and.callThrough();
    const getPokemonFromById = spyOn(fakeService, 'getPokemonFromById').and.resolveTo({...bulbasor});
    return {service:fakeService, getAllPokemon, getPokemonFromById} as iOutput;
 // getPokemonFromByIdSpy=jasmine.createSpy('getPokemonFromById').and.returnValue(Promise.resolve({ name:"Testmon" }));
}


export default makeFakePokemonService;