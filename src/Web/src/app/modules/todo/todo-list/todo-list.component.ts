import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CreateTodoItemRequest, TodoList} from "../../../core/models/todo";
import {TodoService} from "../../../core/services/todo.service";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todoList!: TodoList;
  @Output() removeTodoListEvent = new EventEmitter<string>();
  @Output() addTodoItemEvent = new EventEmitter<CreateTodoItemRequest>();
  @Output() removeTodoItemEvent = new EventEmitter<string>();
  @Output() toggleTodoItemEvent = new EventEmitter<string>();

  note: string = "";

  constructor(private todoService: TodoService) { }

  removeTodoList() {
    this.removeTodoListEvent.emit(this.todoList.id);
  }

  addTodoItem() {
    this.addTodoItemEvent.emit({ note: this.note, todoListId: this.todoList!.id });
  }

  toggleTodoItem(itemId: string) {
    this.toggleTodoItemEvent.emit(itemId);
  }

  removeTodoItem(todoItemId: string) {
    this.removeTodoItemEvent.emit(todoItemId);
  }

  getCompletedClass(done: boolean): string {
      return done ? "completed" : "";
  }
}
