import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Priority} from "../../../../../domain/enums/priority";
import {TodoItemModel, UpdateTodoItemRequest} from "../../../../../domain/models/todoitem.model";
import {AlertService} from "../../../../../domain/services/alert.service";
import {TodoItemUpdateUseCase} from "../../../../../domain/usecases/todoitem/todoitem-update.usecase";

@Component({
  selector: 'update-todoitem-modal',
  templateUrl: './update-todo-item-modal.component.html',
  styleUrls: ['./update-todo-item-modal.component.scss']
})
export class UpdateTodoItemModalComponent implements OnInit {
  @Input() todoItem!: TodoItemModel;
  @Input() isTodayTodoList: boolean = false;

  @Output() updateTodoItemEvent = new EventEmitter<TodoItemModel>();
  updatedNote: string = "";
  updatedPriority: Priority = {} as Priority;
  updatedDeadline: string | null = null;

  constructor(private modalService: NgbModal,
              private todoItemUpdateUseCase: TodoItemUpdateUseCase,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.updatedNote = this.todoItem.note;
    this.updatedPriority = this.todoItem.priority;
    this.updatedDeadline = this.todoItem.deadline;
  }

  updateTodoItem(updatedTodoItem: TodoItemModel) {
    const updateRequest: UpdateTodoItemRequest = {
      id: updatedTodoItem.id,
      note: updatedTodoItem.note,
      priority: updatedTodoItem.priority,
      deadline: updatedTodoItem.deadline,
      done: updatedTodoItem.done
    };

    this.todoItemUpdateUseCase.execute(updateRequest)
      .subscribe({
        next: (todoItem: TodoItemModel) => {
          this.updateTodoItemEvent.emit(todoItem);
          this.alertService.success("Task updated successfully");
        },
        error: (error) => {
          this.alertService.error(error,
            {keepAfterRouteChange: true, autoClose: true});
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

  handlePriorityChange(priority: Priority) {
    this.updatedPriority = priority;
  }

  handleDateTimeChange(dateTime: string | null): void {
    this.updatedDeadline = dateTime;
  }

  open(content: any) {
    this.modalService.open(content, {size: 'lg'});
  }
}
