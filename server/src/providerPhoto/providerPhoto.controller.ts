import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ProviderPhotoService } from "./providerPhoto.service";
import { ProviderPhotoControllerBase } from "./base/providerPhoto.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("provider-photos")
@common.Controller("provider-photos")
export class ProviderPhotoController extends ProviderPhotoControllerBase {
  constructor(
    protected readonly service: ProviderPhotoService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
