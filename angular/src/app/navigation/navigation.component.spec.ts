import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { provideLocationMocks } from '@angular/common/testing';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: '',
            component: NavigationComponent,
          },
        ]),
        provideLocationMocks(),
      ],
      imports: [NavigationComponent]
    }).compileComponents();


    // await TestBed.configureTestingModule({
    //   imports: [NavigationComponent,RouterTestingModule ]
    // })
    // .compileComponents();
    
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
