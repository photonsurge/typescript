import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { provideHttpClient, } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
import { IPokemonListResponse } from './i-pokemon';
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


  
});
