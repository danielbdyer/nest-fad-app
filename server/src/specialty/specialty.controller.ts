import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SpecialtyService } from "./specialty.service";
import { SpecialtyControllerBase } from "./base/specialty.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("specialties")
@common.Controller("specialties")
export class SpecialtyController extends SpecialtyControllerBase {
  constructor(
    protected readonly service: SpecialtyService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
