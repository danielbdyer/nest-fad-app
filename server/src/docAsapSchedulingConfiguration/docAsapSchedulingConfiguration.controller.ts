import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { DocAsapSchedulingConfigurationService } from "./docAsapSchedulingConfiguration.service";
import { DocAsapSchedulingConfigurationControllerBase } from "./base/docAsapSchedulingConfiguration.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("doc-asap-scheduling-configurations")
@common.Controller("doc-asap-scheduling-configurations")
export class DocAsapSchedulingConfigurationController extends DocAsapSchedulingConfigurationControllerBase {
  constructor(
    protected readonly service: DocAsapSchedulingConfigurationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
