import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-do-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  }
}
