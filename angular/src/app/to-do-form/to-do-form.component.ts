import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToDoService } from '../to-do.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './to-do-form.component.html',
  styleUrl: './to-do-form.component.css'
})
export class ToDoFormComponent {
  toDoService = inject(ToDoService);

  toDoForm = new FormGroup({
    name: new FormControl('',  [Validators.required]),
    message: new FormControl('',[]),
  });

  submit():void {
    if (this.toDoForm.invalid) {
      return;
    }

    this.toDoService.addTodo(
      this.toDoForm.value.name ?? '',
      this.toDoForm.value.message?? undefined,
    );
   
    this.toDoForm.reset()
  }

  //open up controls for validation

  get name(){
    return this.toDoForm.get('name')
  }
  get message(){
    return this.toDoForm.get('message')
  }
}
