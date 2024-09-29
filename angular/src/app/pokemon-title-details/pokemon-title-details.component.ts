import { Component, inject, Input, input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { IPokemon } from '../i-pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-title-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-title-details.component.html',
  styleUrl: './pokemon-title-details.component.css'
})
export class PokemonTitleDetailsComponent implements OnInit{
  @Input() id!:string;
  pokemon?:IPokemon;
  service:PokemonService = inject(PokemonService)
  ngOnInit() {
    //  console.log("visible", this.id)
      this.getDetails();
  }

  private async getDetails(){

      this.pokemon = await this.service.getPokemonFromById(this.id)
  }
}
