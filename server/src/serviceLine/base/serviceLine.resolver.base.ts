import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlDefaultAuthGuard from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { DeleteServiceLineArgs } from "./DeleteServiceLineArgs";
import { ServiceLineFindManyArgs } from "./ServiceLineFindManyArgs";
import { ServiceLineFindUniqueArgs } from "./ServiceLineFindUniqueArgs";
import { ServiceLine } from "./ServiceLine";
import { LocationFindManyArgs } from "../../location/base/LocationFindManyArgs";
import { Location } from "../../location/base/Location";
import { SpecialtyFindManyArgs } from "../../specialty/base/SpecialtyFindManyArgs";
import { Specialty } from "../../specialty/base/Specialty";
import { ServiceLineService } from "../serviceLine.service";

@graphql.Resolver(() => ServiceLine)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ServiceLineResolverBase {
  constructor(
    protected readonly service: ServiceLineService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "read",
    possession: "any",
  })
  async _serviceLinesMeta(
    @graphql.Args() args: ServiceLineFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [ServiceLine])
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "read",
    possession: "any",
  })
  async serviceLines(
    @graphql.Args() args: ServiceLineFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ServiceLine[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ServiceLine",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => ServiceLine, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "read",
    possession: "own",
  })
  async serviceLine(
    @graphql.Args() args: ServiceLineFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ServiceLine | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ServiceLine",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => ServiceLine)
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "delete",
    possession: "any",
  })
  async deleteServiceLine(
    @graphql.Args() args: DeleteServiceLineArgs
  ): Promise<ServiceLine | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [Location])
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "read",
    possession: "any",
  })
  async locations(
    @graphql.Parent() parent: ServiceLine,
    @graphql.Args() args: LocationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Location[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Location",
    });
    const results = await this.service.findLocations(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Specialty])
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "read",
    possession: "any",
  })
  async specialties(
    @graphql.Parent() parent: ServiceLine,
    @graphql.Args() args: SpecialtyFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Specialty[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Specialty",
    });
    const results = await this.service.findSpecialties(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
