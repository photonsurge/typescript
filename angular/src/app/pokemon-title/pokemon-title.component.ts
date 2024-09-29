import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { IPokemonName } from '../i-pokemon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VisibilityService } from '../visibility.service';
import { filter, Observable, take } from 'rxjs';
import { PokemonTitleDetailsComponent } from '../pokemon-title-details/pokemon-title-details.component';

@Component({
  selector: 'app-pokemon-title',
  standalone: true,
  imports: [CommonModule, RouterLink, PokemonTitleDetailsComponent],
  templateUrl: './pokemon-title.component.html',
  styleUrl: './pokemon-title.component.css'
})
export class PokemonTitleComponent implements OnInit {
  @Input() pokemon!:IPokemonName

 @HostBinding('class.square') someField: boolean = true;

  createComponent?: Observable<boolean>;
  constructor(private visibilityService: VisibilityService, private host: ElementRef) {}
  ngOnInit() {
    this.createComponent= this.visibilityService.elementInSight(this.host)
    .pipe(filter(visible => visible), take(1));


  }
}
