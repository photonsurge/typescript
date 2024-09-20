import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from "@angular/common/testing"
import { By } from '@angular/platform-browser';
import { DetailsFormComponent } from '../details-form/details-form.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let harness:RouterTestingHarness; 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'details/:id',
            component: DetailsComponent,
          },
        ]),
        provideLocationMocks(),
      ],
      imports: [DetailsFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    //component = fixture.componentInstance;
    harness = await RouterTestingHarness.create('details/1');
    fixture.detectChanges();
  });

  it(':id 1 should populate', waitForAsync(async () => {
   

    const h2: HTMLHeadingElement = harness.fixture.debugElement.query(
      By.css('h2'),
    ).nativeElement;

    expect(h2.textContent).toBe('A113 Transitional Housing');

  }));


  
});
