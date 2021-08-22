import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { LocationTypeResolverBase } from "./base/locationType.resolver.base";
import { LocationType } from "./base/LocationType";
import { LocationTypeService } from "./locationType.service";

@graphql.Resolver(() => LocationType)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class LocationTypeResolver extends LocationTypeResolverBase {
  constructor(
    protected readonly service: LocationTypeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
