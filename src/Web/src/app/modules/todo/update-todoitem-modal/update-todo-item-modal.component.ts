import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Priority, TodoItem} from "../../../core/models/todo";

@Component({
  selector: 'update-todoitem-modal',
  templateUrl: './update-todo-item-modal.component.html',
  styleUrls: ['./update-todo-item-modal.component.scss']
})
export class UpdateTodoItemModalComponent {
  @Input() todoItem!: TodoItem;
  @Input() isTodayTodoList: boolean = false;

  @Output() updateTodoItemEvent = new EventEmitter<TodoItem>();

  constructor(private modalService: NgbModal) { }

  sendValueAndCloseModal(modal: any) {
    this.updateTodoItemEvent.emit(this.todoItem);
    modal.close();
  }

  handlePriorityChange(priority: Priority) {
    this.todoItem.priority = priority;
  }

  handleDateTimeChange(dateTime: string): void {
    this.todoItem.deadline = dateTime;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
