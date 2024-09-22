import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemComponent } from './to-do-item.component';
import { testLng, testSimp } from '../../test-stuff/test-todo';
import { ToDoService } from '../to-do.service';

describe('ToDoItemComponent', () => {
  let component: ToDoItemComponent;
  let fixture: ComponentFixture<ToDoItemComponent>;





  let mockService: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoItemComponent],
      providers: [{
        provide: ToDoService,
        useValue: jasmine.createSpyObj('ToDoService', ['delete'])
     }],
    })
    .compileComponents();
    mockService = TestBed.inject(ToDoService);

    mockService.delete.and.returnValue(); // mock output of function


    fixture = TestBed.createComponent(ToDoItemComponent);
    component = fixture.componentInstance;
    component.toDo = testSimp;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('One');
    expect(compiled.querySelector('.todo-started')?.textContent).toContain('31/1/20');
    //expect(compiled.querySelector('img')?.getAttribute('src')).toEqual('https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg');
  });  
  
  it('should populate', () => {
    component.toDo = testLng
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Two');
    expect(compiled.querySelector('.todo-started')?.textContent).toContain('1/1/20');
    expect(compiled.querySelector('.todo-message')?.textContent).toContain('message');
    
   // expect(compiled.querySelector('img')?.getAttribute('src')).toEqual('https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg');
  });
  it('delete should call with correct ID', () => {
   
    const compiled = fixture.nativeElement as HTMLElement;

   
    expect(compiled.querySelector('.todo-delete')?.textContent).toContain('Delete');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(mockService.delete).toHaveBeenCalled();
    expect(mockService.delete).toHaveBeenCalledWith('one');
    
   // expect(compiled.querySelector('img')?.getAttribute('src')).toEqual('https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg');
  });
});
