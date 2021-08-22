import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { InsuranceCarrierService } from "./insuranceCarrier.service";
import { InsuranceCarrierControllerBase } from "./base/insuranceCarrier.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("insurance-carriers")
@common.Controller("insurance-carriers")
export class InsuranceCarrierController extends InsuranceCarrierControllerBase {
  constructor(
    protected readonly service: InsuranceCarrierService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
