import { TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';

describe('ToDoService', () => {
  let service: ToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start empty', () => {
    expect(service.getAll()).toHaveSize(0);
  });


  it('add add a todo', () => {
    service.addTodo("test")
    const res = service.getAll();
    expect(res).toHaveSize(1);
    expect(res[0].name).toEqual("test")
    expect(res[0].started).toBeTruthy();
  });


  it('add multiple todos', () => {
    service.addTodo("test")
    expect(service.getAll()).toHaveSize(1);
    let res = service.getAll();
    expect(res).toHaveSize(1);
    service.addTodo("test2")
    service.addTodo("test3")
    res = service.getAll();
    expect(res).toHaveSize(3);
  });


  it('add multiple todos', () => {
    service.addTodo("test")
    expect(service.getAll()).toHaveSize(1);
    let res = service.getAll();
    expect(res).toHaveSize(1);
    service.addTodo("test2")
    service.addTodo("test3")
    res = service.getAll();
    expect(res).toHaveSize(3);

    service.delete(res[1].id);
    res = service.getAll();
    expect(res).toHaveSize(2);

    //make sure correct deleted (no test2)
    const names = res.map(d=>d.name);
    expect(names).not.toContain("test2")
  });
});

