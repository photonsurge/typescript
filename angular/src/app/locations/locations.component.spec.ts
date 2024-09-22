import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsComponent } from './locations.component';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: '',
            component: LocationsComponent,
          },
        ]),
        provideLocationMocks(),
      ],
      imports: [LocationsComponent]
    }).compileComponents();


    
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
