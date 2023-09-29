import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from "../../helpers/auth.guard";
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { PriorityPickerComponent } from './priority-picker/priority-picker.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    PriorityPickerComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    NgbDropdownModule
  ],
  providers: [AuthGuard]
})
export class TodoModule { }
