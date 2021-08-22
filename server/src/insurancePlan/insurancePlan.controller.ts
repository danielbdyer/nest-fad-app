import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { InsurancePlanService } from "./insurancePlan.service";
import { InsurancePlanControllerBase } from "./base/insurancePlan.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("insurance-plans")
@common.Controller("insurance-plans")
export class InsurancePlanController extends InsurancePlanControllerBase {
  constructor(
    protected readonly service: InsurancePlanService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
