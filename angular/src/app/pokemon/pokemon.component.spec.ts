import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { PokemonService } from '../pokemon.service';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import {IPokemonName, IPokemon} from "../i-pokemon"
import { bulbasor } from '../../test-stuff/bulbasour';
describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let harness: RouterTestingHarness;
  let mockService;
  let getPokemonFromByIdSpy;
  let fakeService: Pick<PokemonService, keyof PokemonService>
  beforeEach(async () => {

    fakeService = {
      getAllPokemon(): Promise<IPokemonName[]> {
        return Promise.resolve([{name:"test", id:"1", url:""}])
      },
      getPokemonFromById(id): Promise<IPokemon>{
        return Promise.resolve({...bulbasor})
      },
    }
    spyOn(fakeService, 'getAllPokemon').and.callThrough();
    spyOn(fakeService, 'getPokemonFromById').and.callThrough();

    getPokemonFromByIdSpy=jasmine.createSpy('getPokemonFromById').and.returnValue(Promise.resolve({ name:"Testmon" }));
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
});
