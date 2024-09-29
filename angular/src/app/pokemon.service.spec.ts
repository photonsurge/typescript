import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { provideHttpClient, } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
import { IPokemonListResponse } from './i-pokemon';
import { pokemonListResult } from '../test-stuff/bulbasour';
describe('PokemonService', () => {
  let service: PokemonService;
  let httpTesting: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PokemonService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get list of pokemon", async () => {
    const pokemon = service.getAllPokemon();
    const req = httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0', 'Request to load list of pokemon');
    const result: IPokemonListResponse = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'test', url: "https://pokeapi.co/api/v2/pokemon/1/" }]
    }


    expect(req.request.method).toBe('GET');
    req.flush(result)
    const d =  await pokemon;
    expect(d).toEqual([{name:'test', url:"https://pokeapi.co/api/v2/pokemon/1/", id:"1"}])
  });

  it("should cache pokemon", async () => {
    const pokemon = service.getAllPokemon();
    let req = httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0', 'Request to load list of pokemon');
  

    expect(req.request.method).toBe('GET');
    req.flush(pokemonListResult)
    const d =  await pokemon;
    expect(d).toEqual([{name:'test', url:"https://pokeapi.co/api/v2/pokemon/1/", id:"1"}])

    const pokemon2Req = service.getAllPokemon();

    
    httpTesting.expectNone('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0', 'Request to load list of pokemon');
    
    expect(req.request.method).toBe('GET');
    const pokemon2 = await pokemon2Req;
    console.log(pokemon2)
   
   
  
  });


  
});
