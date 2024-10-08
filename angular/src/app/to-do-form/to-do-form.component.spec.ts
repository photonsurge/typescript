import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFormComponent } from './to-do-form.component';
import { ToDoService } from '../to-do.service';

describe('ToDoFormComponent', () => {
  let component: ToDoFormComponent;
  let fixture: ComponentFixture<ToDoFormComponent>;

  // let serviceSpyAdd = jasmine.createSpyObj('ToDoService', ['addTodo']);
  // serviceSpyAdd.addTodo.and.returnValue();
  let mockService:any
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoFormComponent],
      providers: [{
        provide: ToDoService,
        useValue: jasmine.createSpyObj('ToDoService', ['addTodo'])
     }],
    })
    .compileComponents();
    mockService = TestBed.inject(ToDoService);

    mockService.addTodo.and.returnValue(); // mock output of function


    fixture = TestBed.createComponent(ToDoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not be valid as default', () => {
    expect(component.toDoForm.valid).toEqual(false);
  });
  it('should not allow form to be filled in and submitted and cleared after', () => {

    const formData = {
      "name": "sdasd",
      "message":"sd"
    };
    component.toDoForm.setValue(formData);


    fixture.detectChanges();
    expect(component.toDoForm.valid).toEqual(true);

    component.submit();
    fixture.detectChanges();
    expect(component.toDoForm.valid).toEqual(false); 
    expect(component.toDoForm.value.name).toEqual(null)
    expect(component.toDoForm.value.message).toEqual(null)
    

    expect(mockService.addTodo).toHaveBeenCalledTimes(1);
  });
  
});
