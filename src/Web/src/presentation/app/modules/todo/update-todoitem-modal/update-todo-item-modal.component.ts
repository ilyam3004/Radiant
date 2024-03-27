import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Priority, TodoItem, UpdateTodoItemRequest } from "../../../core/models/todo";
import { TodoService } from "../../../core/services/todo.service";
import { AlertService } from "../../../core/services/alert.service";

@Component({
  selector: 'update-todoitem-modal',
  templateUrl: './update-todo-item-modal.component.html',
  styleUrls: ['./update-todo-item-modal.component.scss']
})
export class UpdateTodoItemModalComponent implements OnInit {
  @Input() todoItem!: TodoItem;
  @Input() isTodayTodoList: boolean = false;

  @Output() updateTodoItemEvent = new EventEmitter<TodoItem>();
  updatedNote: string = "";
  updatedPriority: Priority = {} as Priority;
  updatedDeadline: string | null = null;

  constructor(private modalService: NgbModal,
    private todoService: TodoService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.updatedNote = this.todoItem.note;
    this.updatedPriority = this.todoItem.priority;
    this.updatedDeadline = this.todoItem.deadline;
  }


  updateTodoItem(updatedTodoItem: TodoItem) {
    const updateRequest: UpdateTodoItemRequest = {
      id: updatedTodoItem.id,
      note: updatedTodoItem.note,
      priority: updatedTodoItem.priority,
      deadline: updatedTodoItem.deadline,
      done: updatedTodoItem.done
    };

    this.todoService.updateTodoItem(updateRequest)
      .subscribe({
        next: (todoItem: TodoItem) => {
          this.updateTodoItemEvent.emit(todoItem);
          this.alertService.success("Task updated successfully");
        },
        error: (error) => {
          this.alertService.error(error,
            { keepAfterRouteChange: true, autoClose: true });
        }
      });
  }

  sendValueAndCloseModal(modal: any) {
    const updatedTodoItem = this.todoItem;
    updatedTodoItem.note = this.updatedNote;
    updatedTodoItem.priority = this.updatedPriority;
    updatedTodoItem.deadline = this.updatedDeadline == null
      ? null : new Date(this.updatedDeadline).toISOString()

    this.updateTodoItem(updatedTodoItem);
    modal.close();
  }

  removeDeadline() {
    this.updatedDeadline = null;
  }

  handlePriorityChange(priority: Priority) {
    this.updatedPriority = priority;
  }

  handleDateTimeChange(dateTime: string | null): void {
    this.updatedDeadline = dateTime;
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}