import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ProviderTypeService } from "./providerType.service";
import { ProviderTypeControllerBase } from "./base/providerType.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("provider-types")
@common.Controller("provider-types")
export class ProviderTypeController extends ProviderTypeControllerBase {
  constructor(
    protected readonly service: ProviderTypeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
