import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ProviderTypeResolverBase } from "./base/providerType.resolver.base";
import { ProviderType } from "./base/ProviderType";
import { ProviderTypeService } from "./providerType.service";

@graphql.Resolver(() => ProviderType)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ProviderTypeResolver extends ProviderTypeResolverBase {
  constructor(
    protected readonly service: ProviderTypeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
