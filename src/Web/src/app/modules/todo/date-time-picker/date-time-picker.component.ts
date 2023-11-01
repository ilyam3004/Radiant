import { DatePipe } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {
  @Input() isTodayTodoList: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  @Input() selectedDateTime: string | null = null;

  shownDateTime: string | null = null;
  model: NgbDateStruct = this.calendar.getToday();
  date: { year: number; month: number } = this.calendar.getToday();
  time = {hour: 0, minute: 0};

  constructor(private modalService: NgbModal,
              private calendar: NgbCalendar,
              private datePipe: DatePipe) {}

  ngOnInit() {
    if (this.selectedDateTime) {
      this.setShownDateInReadableFormat(this.selectedDateTime);
      const date = new Date(this.selectedDateTime);
      this.model = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
      this.time = {hour: date.getHours(), minute: date.getMinutes()};
    }
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  sendValueAndCloseModal(modal: any) {
    if (this.isTodayTodoList) {
      this.setTodayDate();
    }

    this.selectedDateTime = this.model.year + "/"
      + this.createValidForm(this.model.month) + "/"
      + this.createValidForm(this.model.day) + " "
      + this.createValidForm(this.time.hour) + ":"
      + this.createValidForm(this.time.minute);

    this.setShownDateInReadableFormat(this.selectedDateTime);

    this.valueChange.emit(this.selectedDateTime);
    modal.close();
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  createValidForm(property: number) {
    return property.toString().length === 1 ? `0${property}` : property;
  }

  private setTodayDate() {
    this.model.year = this.calendar.getToday().year;
    this.model.month = this.calendar.getToday().month;
    this.model.day = this.calendar.getToday().day;
  }


  private setShownDateInReadableFormat(isoDateTime: string){
    const date: Date = new Date(isoDateTime);
    if (this.isYearsEqual(date)) {
      this.shownDateTime = this.datePipe.transform(isoDateTime, 'MMM d, HH:mm');
      return;
    }

    this.shownDateTime = this.datePipe.transform(isoDateTime, 'MMM d, y, HH:mm');
  }

  isYearsEqual(date: Date): boolean {
    const currentDate = new Date();
    return date.getFullYear() == currentDate.getFullYear();
  }
}
