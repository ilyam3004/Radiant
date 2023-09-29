import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CreateTodoItemRequest, Priority, TodoList} from "../../../core/models/todo";
import { TodoService } from "../../../core/services/todo.service";
import {AlertService} from "../../../core/services/alert.service";

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
  priorities: string[] = ["🟢", "🟡", "🔴"];

  selectedPriority: Priority | null = null;
  deadline: string | null = null;
  note: string = "";

  constructor(private todoService: TodoService,
              private alertService: AlertService) { }

  removeTodoList() {
    this.removeTodoListEvent.emit(this.todoList.id);
  }

  addTodoItem() {
    console.log({
      note: this.note,
      todoListId: this.todoList!.id,
      Priority: this.selectedPriority,
      deadline: null
    })
    if(this.selectedPriority !== null) {
      this.addTodoItemEvent.emit({
        note: this.note,
        todoListId: this.todoList!.id,
        Priority: this.selectedPriority,
        deadline: Date.parse(this.deadline!)
      })
    } else {
      this.alertService.error("Please select a priority");
    }
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

  handlePriorityChange(priority: Priority): void {
    this.selectedPriority = priority;
  }

  handleDateTimeChange(dateTime: string): void {
    this.deadline = dateTime;
  }
}
