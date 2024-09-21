import { Component } from '@angular/core';
import { ToDoFormComponent } from '../to-do-form/to-do-form.component';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [ToDoFormComponent, ToDoListComponent],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css'
})
export class ChecklistComponent {

}
