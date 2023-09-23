import { Component, EventEmitter, Input, Output } from '@angular/core';
import {TodoList} from "../../../core/models/todo";
import {TodoService} from "../../../core/services/todo.service";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todoList: TodoList | null = null;
  @Output() removeTodoListEvent = new EventEmitter<void>();
  note: string = "";

  constructor(private todoService: TodoService) { }

  removeTodoList() {
    this.removeTodoListEvent.emit();
  }

  addTodoItem() {

  }
}
