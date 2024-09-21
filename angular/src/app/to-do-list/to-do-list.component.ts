import { Component, inject } from '@angular/core';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
  toDoService = inject(ToDoService);
}
