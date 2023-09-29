import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {NgbCalendar, NgbDateStruct, NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent {
  @Output() valueChange = new EventEmitter<string>();
  model: NgbDateStruct = this.calendar.getToday();
  date: { year: number; month: number } = this.calendar.getToday();
  time = { hour: 0, minute: 0 };

  selectedDateTime: string = "";

  constructor(private modalService: NgbModal,
              private calendar: NgbCalendar){ }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  sendValueAndCloseModal(modal: any) {
    this.selectedDateTime = this.model.year + "/"
      + this.createValidForm(this.model.month) + "/"
      + this.createValidForm(this.model.day) + " "
      + this.createValidForm(this.time.hour) + ":"
      + this.createValidForm(this.time.minute);

    this.valueChange.emit(this.selectedDateTime);
    modal.close();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  createValidForm(property: number){
    return property.toString().length === 1 ? `0${property}` : property;
  }
}
