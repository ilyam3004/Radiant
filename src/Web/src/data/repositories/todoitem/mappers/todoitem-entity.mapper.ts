import {TodoItemEntity} from "../../../entities/todoitem-entity";
import {Mapper} from "../../../../base/mapper";
import {TodoItemModel} from "../../../../domain/models/todoitem.model";

export class TodoItemEntityMapper extends Mapper<TodoItemEntity, TodoItemModel> {

  override mapFrom(entity: TodoItemEntity): TodoItemModel {
    return {
      id: entity.id,
      note: entity.note,
      done: entity.done,
      todoListId: entity.todoListId,
      priority: entity.priority,
      deadline: entity.deadline,
      createdAt: entity.createdAt,
      loading: entity.loading
    }
  }

  override mapTo(model: TodoItemModel): TodoItemEntity {
    return {
      id: model.id,
      note: model.note,
      done: model.done,
      todoListId: model.todoListId,
      priority: model.priority,
      deadline: model.deadline,
      createdAt: model.createdAt,
      loading: model.loading
    }
  }
}
