import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ServiceLineResolverBase } from "./base/serviceLine.resolver.base";
import { ServiceLine } from "./base/ServiceLine";
import { ServiceLineService } from "./serviceLine.service";

@graphql.Resolver(() => ServiceLine)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ServiceLineResolver extends ServiceLineResolverBase {
  constructor(
    protected readonly service: ServiceLineService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
