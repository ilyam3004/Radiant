import {Component, EventEmitter, Output} from '@angular/core';
import {Priority} from "../../../core/models/todo";

@Component({
  selector: 'priority-picker',
  templateUrl: './priority-picker.component.html',
  styleUrls: ['./priority-picker.component.scss']
})
export class PriorityPickerComponent {
  @Output() selectPriorityEvent = new EventEmitter<Priority>();
  priorityOptions: Priority[] = Object.values(Priority);
  selectedPriority: Priority | null = null;

  selectPriority(priority: Priority): void {
    this.selectedPriority = priority;
    this.selectPriorityEvent.emit(this.selectedPriority);
  }
}
