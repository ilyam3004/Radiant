import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {TodoRoutingModule} from './todo-routing.module';
import {TodoComponent} from './todo/todo.component';
import {AuthGuard} from "../../helpers/auth.guard";
import {TodoListComponent} from './todo-list/todo-list.component';
import {FormsModule} from '@angular/forms';
import {PriorityPickerComponent} from './priority-picker/priority-picker.component';
import {NgbDatepickerModule, NgbDropdownModule, NgbNavModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DateTimePickerComponent} from './date-time-picker/date-time-picker.component';
import {ApiInterceptor} from "../../helpers/api.interceptor";
import {ErrorInterceptor} from "../../helpers/error.interceptor";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UpdateTodoItemModalComponent } from './update-todoitem-modal/update-todo-item-modal.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    PriorityPickerComponent,
    DateTimePickerComponent,
    UpdateTodoItemModalComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbNavModule
  ],
  providers: [AuthGuard, DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ]
})
export class TodoModule {
}
