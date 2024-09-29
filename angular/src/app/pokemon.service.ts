import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPokemon, IPokemonListResponse, IPokemonName } from './i-pokemon';
import { lastValueFrom } from 'rxjs';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly baseURL = "https://pokeapi.co/api/v2/"

  private results:IPokemonName[]=[]


  constructor(
    private http: HttpClient
  ) { }

  public async getAllPokemon() {
    console.log("getall")
    if(this.results.length ===0){
      try{
      console.log("ewsu")
      const pokemon = await lastValueFrom(this.http.get<IPokemonListResponse>(`${this.baseURL}pokemon?limit=10000&offset=0`))
      console.log("ewsu")
      const allpokemon= pokemon.results.map(poke => {
        poke.id = poke.url
          .replace(`${this.baseURL}pokemon/`, "")
          .replace('/', '')
        return poke;
      });
      console.log("ewsu")
      this.results=allpokemon;
      return allpokemon;
    } catch(ex){
      throw "Error getting pokemon"
    }
    } else {
      console.log("res")
      return this.results;
    }
  }

  public async getPokemonFromById(id: string) {
    const index = this.results.findIndex(d=>d.id === id)
    if(index >= 0){
      if(this.results[index] && this.results[index].data){
        return this.results[index].data
      } else {
        const pokemon = await lastValueFrom(this.http.get<IPokemon>(`${this.baseURL}pokemon/${id}`))
        this.results[index].data = pokemon;
        return pokemon;
      }
    } else {  
      await this.getAllPokemon();
      const index = this.results.findIndex(d=>d.id === id)
      const pokemon = await lastValueFrom(this.http.get<IPokemon>(`${this.baseURL}pokemon/${id}`))
      this.results[index].data = pokemon;
      return pokemon;
    }
   
  }



}
