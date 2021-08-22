import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ProviderPhotoResolverBase } from "./base/providerPhoto.resolver.base";
import { ProviderPhoto } from "./base/ProviderPhoto";
import { ProviderPhotoService } from "./providerPhoto.service";

@graphql.Resolver(() => ProviderPhoto)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ProviderPhotoResolver extends ProviderPhotoResolverBase {
  constructor(
    protected readonly service: ProviderPhotoService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
