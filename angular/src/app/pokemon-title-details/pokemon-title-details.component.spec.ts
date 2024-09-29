import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTitleDetailsComponent } from './pokemon-title-details.component';
import { PokemonService } from '../pokemon.service';
import { provideLocationMocks } from '@angular/common/testing';
import makeFakePokemonService from '../../test-stuff/test-pokemon-service';
describe('PokemonTitleDetailsComponent', () => {
  let component: PokemonTitleDetailsComponent;
  let fixture: ComponentFixture<PokemonTitleDetailsComponent>;
  let fakeService: Pick<PokemonService, keyof PokemonService>;

  beforeEach(async () => {

    const fake = makeFakePokemonService()
    fakeService = fake.service;



    await TestBed.configureTestingModule({
      imports: [PokemonTitleDetailsComponent],
      providers:[    
        provideLocationMocks(),
        {
          provide: PokemonService,
          useValue: fakeService
        }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonTitleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
});
