import {UserClaimModel} from "../../../../domain/models/user-claim.model";
import {UserClaimEntity} from "../../../entities/user-claim-entity";
import { Mapper } from "src/base/mapper";

export class UserClaimEntityMapper extends Mapper<UserClaimEntity, UserClaimModel> {
    mapFrom(entity: UserClaimEntity): UserClaimModel {
      return {
        type: entity.type,
        value: entity.value
      }
    }

    mapTo(model: UserClaimModel): UserClaimEntity {
      return {
        type: model.type,
        value: model.value
      }
    }
}
