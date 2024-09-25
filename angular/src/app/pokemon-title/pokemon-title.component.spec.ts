import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTitleComponent } from './pokemon-title.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokemonTitleComponent', () => {
  let component: PokemonTitleComponent;
  let fixture: ComponentFixture<PokemonTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PokemonTitleComponent]
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
});
