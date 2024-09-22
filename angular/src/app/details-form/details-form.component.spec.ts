import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DetailsFormComponent } from './details-form.component';
import testHouse from '../../test-stuff/test-location';
import { HousingService } from '../housing.service';

describe('DetailsFormComponent', () => {
  let component: DetailsFormComponent;
  let fixture: ComponentFixture<DetailsFormComponent>;


  
  let mockService:any
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      imports:[DetailsFormComponent],

      providers: [{
        provide: HousingService,
        useValue: jasmine.createSpyObj('HousingService', ['submitApplication'])
     }],
    })
    .compileComponents();

    mockService = TestBed.inject(HousingService);

    mockService.submitApplication.and.returnValue(); // mock output of function

  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not be valid as default', () => {
    expect(component.applyForm.valid).toEqual(false);
  });
  it('should not allow form to be filled in and submitted', () => {
    component.housingLocation =  testHouse;
    const formData = {
      "firstName": "invalidemail",
      "lastName":"dfdsfs",
      "email": "asdasdasd@sdsdsa.com"
    };
    component.applyForm.setValue(formData);
    component.submitApplication();

    expect(component.applyForm.valid).toEqual(true);
    expect(mockService.submitApplication).toHaveBeenCalledTimes(1);
  });
});
