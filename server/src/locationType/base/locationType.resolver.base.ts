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
import { CreateLocationTypeArgs } from "./CreateLocationTypeArgs";
import { UpdateLocationTypeArgs } from "./UpdateLocationTypeArgs";
import { DeleteLocationTypeArgs } from "./DeleteLocationTypeArgs";
import { LocationTypeFindManyArgs } from "./LocationTypeFindManyArgs";
import { LocationTypeFindUniqueArgs } from "./LocationTypeFindUniqueArgs";
import { LocationType } from "./LocationType";
import { LocationFindManyArgs } from "../../location/base/LocationFindManyArgs";
import { Location } from "../../location/base/Location";
import { LocationTypeService } from "../locationType.service";

@graphql.Resolver(() => LocationType)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class LocationTypeResolverBase {
  constructor(
    protected readonly service: LocationTypeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "LocationType",
    action: "read",
    possession: "any",
  })
  async _locationTypesMeta(
    @graphql.Args() args: LocationTypeFindManyArgs
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

  @graphql.Query(() => [LocationType])
  @nestAccessControl.UseRoles({
    resource: "LocationType",
    action: "read",
    possession: "any",
  })
  async locationTypes(
    @graphql.Args() args: LocationTypeFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LocationType[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LocationType",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => LocationType, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "LocationType",
    action: "read",
    possession: "own",
  })
  async locationType(
    @graphql.Args() args: LocationTypeFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LocationType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "LocationType",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => LocationType)
  @nestAccessControl.UseRoles({
    resource: "LocationType",
    action: "create",
    possession: "any",
  })
  async createLocationType(
    @graphql.Args() args: CreateLocationTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LocationType> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "LocationType",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"LocationType"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => LocationType)
  @nestAccessControl.UseRoles({
    resource: "LocationType",
    action: "update",
    possession: "any",
  })
  async updateLocationType(
    @graphql.Args() args: UpdateLocationTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LocationType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LocationType",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"LocationType"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => LocationType)
  @nestAccessControl.UseRoles({
    resource: "LocationType",
    action: "delete",
    possession: "any",
  })
  async deleteLocationType(
    @graphql.Args() args: DeleteLocationTypeArgs
  ): Promise<LocationType | null> {
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
    resource: "LocationType",
    action: "read",
    possession: "any",
  })
  async locations(
    @graphql.Parent() parent: LocationType,
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
}
