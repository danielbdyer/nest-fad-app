import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { MedicalGroupResolverBase } from "./base/medicalGroup.resolver.base";
import { MedicalGroup } from "./base/MedicalGroup";
import { MedicalGroupService } from "./medicalGroup.service";

@graphql.Resolver(() => MedicalGroup)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class MedicalGroupResolver extends MedicalGroupResolverBase {
  constructor(
    protected readonly service: MedicalGroupService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
