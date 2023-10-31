import {Component, EventEmitter, Output} from '@angular/core';
import {Priority} from "../../../core/models/todo";

@Component({
  selector: 'priority-picker',
  templateUrl: './priority-picker.component.html',
  styleUrls: ['./priority-picker.component.scss']
})
export class PriorityPickerComponent {
  @Output() selectPriorityEvent = new EventEmitter<Priority>();
  priorityOptions: Priority[] = [Priority.Low, Priority.Medium, Priority.High];
  selectedPriority: Priority | null = null;
  priorities: string[] = ["Low🟢", "Medium🟡", "High🔴"];

  selectPriority(priority: Priority): void {
    this.selectedPriority = priority;
    console.log(this.selectedPriority)
    this.selectPriorityEvent.emit(this.selectedPriority);
  }
}
