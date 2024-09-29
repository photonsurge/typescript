import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTitleComponent } from './pokemon-title.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VisibilityService } from '../visibility.service';
import { BehaviorSubject } from 'rxjs';
import { provideLocationMocks } from '@angular/common/testing';
import { PokemonService } from '../pokemon.service';
import makeFakePokemonService from '../../test-stuff/test-pokemon-service';
import makeFakeVisiblityService from '../../test-stuff/test-visibility-service';

describe('PokemonTitleComponent', () => {
  let component: PokemonTitleComponent;
  let fixture: ComponentFixture<PokemonTitleComponent>;
  let fakeVisService: Pick<VisibilityService, keyof VisibilityService>;
  let elementInSightSubject:BehaviorSubject<boolean>;
  let fakePokeService: Pick<PokemonService, keyof PokemonService>
  let elementInSight:jasmine.Spy;
  beforeEach(async () => {
    const fake = makeFakePokemonService()
    fakePokeService = fake.service;
     
    const fakeVis = makeFakeVisiblityService()
    fakeVisService = fakeVis.service;
    elementInSightSubject = fakeVis.control;
    elementInSight = fakeVis.elementInSight;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PokemonTitleComponent],
      providers:[    
        provideLocationMocks(),
        {
          provide: VisibilityService,
          useValue: fakeVisService
        },
        {
          provide: PokemonService,
          useValue: fakePokeService
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonTitleComponent);
    component = fixture.componentInstance;
    component.pokemon = { id: "1", name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
  it('should populate', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component).toBeTruthy();
    expect(compiled.querySelector('h2')?.textContent).toContain('#1 bulbasaur');
    expect(compiled.querySelector('.pokemon-link')?.getAttribute('href')).toEqual('/pokemon/1');
  });

  it('should populate', () => {
    let compiled = fixture.nativeElement as HTMLElement;
    expect(component).toBeTruthy();
    expect(compiled.querySelector('h2')?.textContent).toContain('#1 bulbasaur');
    expect(compiled.querySelector('.pokemon-link')?.getAttribute('href')).toEqual('/pokemon/1');
    expect(compiled.querySelector('.pokemonTitleDetails')).toBeFalsy()

    elementInSightSubject.next(false);
    fixture.detectChanges();

    elementInSightSubject.next(true);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.testDisp')).toBeTruthy()

  });
});
