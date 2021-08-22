import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { InsuranceCarrierResolverBase } from "./base/insuranceCarrier.resolver.base";
import { InsuranceCarrier } from "./base/InsuranceCarrier";
import { InsuranceCarrierService } from "./insuranceCarrier.service";

@graphql.Resolver(() => InsuranceCarrier)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class InsuranceCarrierResolver extends InsuranceCarrierResolverBase {
  constructor(
    protected readonly service: InsuranceCarrierService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
