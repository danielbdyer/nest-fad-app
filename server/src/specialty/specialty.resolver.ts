import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SpecialtyResolverBase } from "./base/specialty.resolver.base";
import { Specialty } from "./base/Specialty";
import { SpecialtyService } from "./specialty.service";

@graphql.Resolver(() => Specialty)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class SpecialtyResolver extends SpecialtyResolverBase {
  constructor(
    protected readonly service: SpecialtyService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
