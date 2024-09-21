import { Component, Input } from '@angular/core';
import { iToDo } from '../iToDo';

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [ToDoItemComponent],
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.css'
})
export class ToDoItemComponent {
  @Input() toDo!: iToDo;
}
