import { Injectable } from '@angular/core';
import { iToDo } from './iToDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private list:iToDo[] = [];
  constructor() { }

  private uniqueId=()=>{
    return Math.random().toString(16).slice(2)
  }
  
  public addTodo=(name:string, message?:string)=>{
  //  console.log("addTodo", this.list)
    this.list.push({id:this.uniqueId(), name:name, started:new Date(), message})
  }
  
  public getAll=()=>{
    return this.list;
  }

  public delete=(id:string)=>{
    console.log(id)
    this.list = this.list.filter(dd=>dd.id!== id);
  }
}
