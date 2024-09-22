import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { RouterTestingHarness } from '@angular/router/testing';

describe('AppComponent', () => {
  
  let fixture: ComponentFixture<AppComponent>;
  let harness:RouterTestingHarness; 
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: '',
            component: AppComponent,
          },
        ]),
        provideLocationMocks(),
      ],
      imports: [AppComponent]
    }).compileComponents();
    
    // await TestBed.configureTestingModule({
    //   imports: [AppComponent],
    // }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'checklist' title`, waitForAsync(async () => {
    const fixture = TestBed.createComponent(AppComponent);
    harness = await RouterTestingHarness.create('');
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.title).toEqual('checklist');
  }));

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('cheHellocklist');
  // });
});
