import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { DocAsapSchedulingConfigurationResolverBase } from "./base/docAsapSchedulingConfiguration.resolver.base";
import { DocAsapSchedulingConfiguration } from "./base/DocAsapSchedulingConfiguration";
import { DocAsapSchedulingConfigurationService } from "./docAsapSchedulingConfiguration.service";

@graphql.Resolver(() => DocAsapSchedulingConfiguration)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class DocAsapSchedulingConfigurationResolver extends DocAsapSchedulingConfigurationResolverBase {
  constructor(
    protected readonly service: DocAsapSchedulingConfigurationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
