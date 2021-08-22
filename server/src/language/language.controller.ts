import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LanguageService } from "./language.service";
import { LanguageControllerBase } from "./base/language.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("languages")
@common.Controller("languages")
export class LanguageController extends LanguageControllerBase {
  constructor(
    protected readonly service: LanguageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
