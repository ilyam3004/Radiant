import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from "../../helpers/auth.guard";
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule
  ],
  providers: [AuthGuard]
})
export class TodoModule { }
