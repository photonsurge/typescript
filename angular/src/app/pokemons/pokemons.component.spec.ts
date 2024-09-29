import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsComponent } from './pokemons.component';
import { PokemonService } from '../pokemon.service';
import makeFakePokemonService from '../../test-stuff/test-pokemon-service';
import { VisibilityService } from '../visibility.service';
import makeFakeVisiblityService from '../../test-stuff/test-visibility-service';
import { provideLocationMocks } from '@angular/common/testing';
import { RouterModule } from '@angular/router';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;


  let fakeService: Pick<PokemonService, keyof PokemonService>
  let fakeVisService: Pick<VisibilityService, keyof VisibilityService>
  let getAllPokemon:jasmine.Spy;
  let getPokemonFromById:jasmine.Spy;
  beforeEach(async () => {
    
    const fakes = makeFakePokemonService()
    fakeService = fakes.service;
    getAllPokemon = fakes.getAllPokemon;
    getPokemonFromById = fakes.getPokemonFromById;
    
    const fakeVis = makeFakeVisiblityService();
    fakeVisService = fakeVis.service


    await TestBed.configureTestingModule({
      imports: [
        PokemonsComponent,    
        RouterModule.forRoot([])],
      providers: [
        {
          provide: PokemonService,
          useValue: fakeService
        },
        provideLocationMocks(),
        {
          provide: VisibilityService,
          useValue: fakeVisService
        }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call all pokemon', () => {
    expect(getAllPokemon).toHaveBeenCalled();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.col-sm-4')).toBeTruthy();
    
  });
});
