import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPokemon, IPokemonListResponse } from './i-pokemon';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly baseURL = "https://pokeapi.co/api/v2/"

  constructor(
    private http: HttpClient
  ) { }

  public async getAllPokemon() {
    const pokemon = await lastValueFrom(this.http.get<IPokemonListResponse>(`${this.baseURL}pokemon?limit=10000&offset=0`))
    return pokemon.results.map(poke => {
      poke.id = poke.url.replace(`${this.baseURL}pokemon/`, "").replace('/', '')
      return poke;
    });
  }

  public async getPokemonFromById(id: string) {
    const pokemon = await lastValueFrom(this.http.get<IPokemon>(`${this.baseURL}pokemon/${id}`))
    return pokemon;
  }
}
