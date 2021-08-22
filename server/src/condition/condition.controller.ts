import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ConditionService } from "./condition.service";
import { ConditionControllerBase } from "./base/condition.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("conditions")
@common.Controller("conditions")
export class ConditionController extends ConditionControllerBase {
  constructor(
    protected readonly service: ConditionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
