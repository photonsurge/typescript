import { Injectable } from '@angular/core';
import { iToDo } from './iToDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private todoList:iToDo[] = [];
  constructor() { }

  uniqueId=()=>{
    return Math.random().toString(16).slice(2)
  }
  public addTodo=(name:string)=>{
    this.todoList.push({id:this.uniqueId(), name:name, dateAdded:new Date()})
  }
  public getAll=()=>{
    return this.todoList;
  }
}
