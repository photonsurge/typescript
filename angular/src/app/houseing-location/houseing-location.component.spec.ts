import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { HouseingLocationComponent } from './houseing-location.component';
import testHouse from '../../test-stuff/test-location';

describe('HouseingLocationComponent', () => {
  let component: HouseingLocationComponent;
  let fixture: ComponentFixture<HouseingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HouseingLocationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HouseingLocationComponent);
    component = fixture.componentInstance;
    component.housingLocation = testHouse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should populate', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Acme Fresh Start Housing');
    expect(compiled.querySelector('.listing-location')?.textContent).toContain('Chicago');
    expect(compiled.querySelector('.listing-location')?.textContent).toContain('IL');
    expect(compiled.querySelector('img')?.getAttribute('src')).toEqual('https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg');
  });
});
