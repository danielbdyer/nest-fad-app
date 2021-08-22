import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { InsurancePlanResolverBase } from "./base/insurancePlan.resolver.base";
import { InsurancePlan } from "./base/InsurancePlan";
import { InsurancePlanService } from "./insurancePlan.service";

@graphql.Resolver(() => InsurancePlan)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class InsurancePlanResolver extends InsurancePlanResolverBase {
  constructor(
    protected readonly service: InsurancePlanService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
