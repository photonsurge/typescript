import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { IPokemonName } from '../i-pokemon';
import { PokemonTitleComponent } from '../pokemon-title/pokemon-title.component';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [CommonModule, PokemonTitleComponent],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css'
})
export class PokemonsComponent implements OnInit {
  service:PokemonService = inject(PokemonService)
  list:IPokemonName[] = []
  ngOnInit(): void {
    this.get()
  }
  async get(){
    this.list = await this.service.getAllPokemon();
  }
}
