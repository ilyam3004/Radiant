import {TodoListEntity} from "../../../entities/todolist-entity";
import {TodoListModel} from "../../../../domain/models/todolist.model";
import {TodoItemEntityMapper} from "../../todoitem/mappers/todoitem-entity.mapper";
import {Mapper} from "../../../../base/mapper";

export class TodolistEntityMapper extends Mapper<TodoListEntity, TodoListModel> {
  private todoItemEntityMapper: TodoItemEntityMapper;

  constructor() {
    super();
    this.todoItemEntityMapper = new TodoItemEntityMapper();
  }

  mapFrom(entity: TodoListEntity): TodoListModel {
    return {
      id: entity.id,
      title: entity.title,
      todoItems: entity.todoItems.map(item =>
        this.todoItemEntityMapper.mapFrom(item)),
      userId: entity.userId,
      createdAt: entity.createdAt,
      isTodayTodoList: entity.isTodayTodoList
    }
  }

  mapTo(model: TodoListModel): TodoListEntity {
    return {
      id: model.id,
      title: model.title,
      todoItems: model.todoItems.map(item =>
        this.todoItemEntityMapper.mapTo(item)),
      userId: model.userId,
      createdAt: model.createdAt,
      isTodayTodoList: model.isTodayTodoList
    }
  }
}
