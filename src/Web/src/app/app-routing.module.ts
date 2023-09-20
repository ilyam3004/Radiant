import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./helpers/auth.guard";

const authModule = () => import('./modules/auth/auth.module')
  .then(x => x.AuthModule);
const todoModule = () => import('./modules/todo/todo.module')
  .then(x => x.TodoModule);

const routes: Routes = [
  { path: 'todo', loadChildren: todoModule, canActivate: [AuthGuard]},
  { path: 'account', loadChildren: authModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
