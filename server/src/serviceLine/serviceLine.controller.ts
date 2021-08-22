import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ServiceLineService } from "./serviceLine.service";
import { ServiceLineControllerBase } from "./base/serviceLine.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("service-lines")
@common.Controller("service-lines")
export class ServiceLineController extends ServiceLineControllerBase {
  constructor(
    protected readonly service: ServiceLineService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
