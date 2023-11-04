import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Priority} from "../../../core/models/todo";

@Component({
  selector: 'priority-picker',
  templateUrl: './priority-picker.component.html',
  styleUrls: ['./priority-picker.component.scss']
})
export class PriorityPickerComponent {
  @Output() selectPriorityEvent = new EventEmitter<Priority>();
  @Input() selectedPriority: Priority | null = null;
  priorityOptions: Priority[] = [Priority.Low, Priority.Medium, Priority.High];
  priorities: string[] = ["Low🟢", "Medium🟡", "High🔴"];

  selectPriority(priority: Priority): void {
    this.selectedPriority = priority;
    console.log(this.selectedPriority)
    this.selectPriorityEvent.emit(this.selectedPriority);
  }
}
