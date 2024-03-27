import {Mapper} from "../../../../base/mapper";
import {UserEntity} from "../../../entities/user-entity";
import {UserModel} from "../../../../domain/models/user.model";

export class UserEntityMapper extends Mapper<UserEntity, UserModel> {
  mapFrom(entity: UserEntity): UserModel {
    return {
      username: entity.username,
      email: entity.email
    }
  }

  mapTo(model: UserModel): UserEntity {
    return {
      username: model.username,
      email: model.email
    }
  }
}
