import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { IPokemon } from '../i-pokemon';
@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  service: PokemonService = inject(PokemonService)

  pokemonId: string = "";
  pokemon?:IPokemon;
  constructor() {
    if (this.route.snapshot) {
      this.pokemonId = this.route.snapshot.params['id'];
      this.getPokemon();
    }

  }
  async getPokemon(){
    this.pokemon = await this.service.getPokemonFromById(this.pokemonId);
  }
}
