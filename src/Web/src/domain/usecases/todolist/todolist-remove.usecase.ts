import {TodolistRepository} from "../../repositories/todolist.repository";
import {UseCase} from "../../../base/use-case";
import {Observable} from "rxjs";

export class TodolistRemoveUseCase implements UseCase<string, void> {
  constructor(private todolistRepository: TodolistRepository) { }

  execute(todolistId: string): Observable<void> {
    return this.todolistRepository.removeTodoList(todolistId);
  }
}
