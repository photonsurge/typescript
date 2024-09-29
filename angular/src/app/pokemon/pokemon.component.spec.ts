import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { PokemonService } from '../pokemon.service';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import makeFakePokemonService from '../../test-stuff/test-pokemon-service';
describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let harness: RouterTestingHarness;
  let mockService;
  //  let getPokemonFromByIdSpy;
  let fakeService: Pick<PokemonService, keyof PokemonService>
  let getAllPokemon:jasmine.Spy;
  let getPokemonFromById:jasmine.Spy;
  beforeEach(async () => {
  
    const fakes = makeFakePokemonService()
    fakeService = fakes.service;
    getAllPokemon = fakes.getAllPokemon;
    getPokemonFromById = fakes.getPokemonFromById;
    await TestBed.configureTestingModule({
      imports: [PokemonComponent],
      providers: [
        provideRouter([
          {
            path: 'pokemon/:id',
            component: PokemonComponent,
          },
        ]),
        provideLocationMocks(),
        {
          provide: PokemonService,
          useValue: fakeService
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);

    mockService = TestBed.inject(PokemonService);


    harness = await RouterTestingHarness.create('pokemon/1');
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  
  it('should getPokemon', () => {

    expect(getPokemonFromById).toHaveBeenCalled();

    
  });
  it('should populate', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component).toBeTruthy();
    expect(compiled.querySelector('h2')?.textContent).toContain('#1 bulbasaur');
    expect(compiled.querySelector('.pokemonHeight')?.textContent).toContain('7');
    expect(compiled.querySelector('.pokemonWeight')?.textContent).toContain('69');
  });
});
