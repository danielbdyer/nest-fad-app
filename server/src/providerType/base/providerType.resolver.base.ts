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
import { CreateProviderTypeArgs } from "./CreateProviderTypeArgs";
import { UpdateProviderTypeArgs } from "./UpdateProviderTypeArgs";
import { DeleteProviderTypeArgs } from "./DeleteProviderTypeArgs";
import { ProviderTypeFindManyArgs } from "./ProviderTypeFindManyArgs";
import { ProviderTypeFindUniqueArgs } from "./ProviderTypeFindUniqueArgs";
import { ProviderType } from "./ProviderType";
import { ProviderFindManyArgs } from "../../provider/base/ProviderFindManyArgs";
import { Provider } from "../../provider/base/Provider";
import { ProviderTypeService } from "../providerType.service";

@graphql.Resolver(() => ProviderType)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ProviderTypeResolverBase {
  constructor(
    protected readonly service: ProviderTypeService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "ProviderType",
    action: "read",
    possession: "any",
  })
  async _providerTypesMeta(
    @graphql.Args() args: ProviderTypeFindManyArgs
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

  @graphql.Query(() => [ProviderType])
  @nestAccessControl.UseRoles({
    resource: "ProviderType",
    action: "read",
    possession: "any",
  })
  async providerTypes(
    @graphql.Args() args: ProviderTypeFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderType[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ProviderType",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => ProviderType, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ProviderType",
    action: "read",
    possession: "own",
  })
  async providerType(
    @graphql.Args() args: ProviderTypeFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ProviderType",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => ProviderType)
  @nestAccessControl.UseRoles({
    resource: "ProviderType",
    action: "create",
    possession: "any",
  })
  async createProviderType(
    @graphql.Args() args: CreateProviderTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderType> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ProviderType",
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
        `providing the properties: ${properties} on ${"ProviderType"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => ProviderType)
  @nestAccessControl.UseRoles({
    resource: "ProviderType",
    action: "update",
    possession: "any",
  })
  async updateProviderType(
    @graphql.Args() args: UpdateProviderTypeArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ProviderType",
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
        `providing the properties: ${properties} on ${"ProviderType"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => ProviderType)
  @nestAccessControl.UseRoles({
    resource: "ProviderType",
    action: "delete",
    possession: "any",
  })
  async deleteProviderType(
    @graphql.Args() args: DeleteProviderTypeArgs
  ): Promise<ProviderType | null> {
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

  @graphql.ResolveField(() => [Provider])
  @nestAccessControl.UseRoles({
    resource: "ProviderType",
    action: "read",
    possession: "any",
  })
  async provider(
    @graphql.Parent() parent: ProviderType,
    @graphql.Args() args: ProviderFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Provider[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Provider",
    });
    const results = await this.service.findProvider(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
