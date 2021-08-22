import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LocationTypeService } from "./locationType.service";
import { LocationTypeControllerBase } from "./base/locationType.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("location-types")
@common.Controller("location-types")
export class LocationTypeController extends LocationTypeControllerBase {
  constructor(
    protected readonly service: LocationTypeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
