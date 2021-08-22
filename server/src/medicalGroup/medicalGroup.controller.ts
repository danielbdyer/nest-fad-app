import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { MedicalGroupService } from "./medicalGroup.service";
import { MedicalGroupControllerBase } from "./base/medicalGroup.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("medical-groups")
@common.Controller("medical-groups")
export class MedicalGroupController extends MedicalGroupControllerBase {
  constructor(
    protected readonly service: MedicalGroupService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
