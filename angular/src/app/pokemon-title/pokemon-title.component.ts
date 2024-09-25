import { Component, HostBinding, Input } from '@angular/core';
import { IPokemonName } from '../i-pokemon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-title',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-title.component.html',
  styleUrl: './pokemon-title.component.css'
})
export class PokemonTitleComponent {
  @Input() pokemon!:IPokemonName

  @HostBinding('class.col-4') someField: boolean = true;
}
