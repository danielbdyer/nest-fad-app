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
import { CreateProviderPhotoArgs } from "./CreateProviderPhotoArgs";
import { UpdateProviderPhotoArgs } from "./UpdateProviderPhotoArgs";
import { DeleteProviderPhotoArgs } from "./DeleteProviderPhotoArgs";
import { ProviderPhotoFindManyArgs } from "./ProviderPhotoFindManyArgs";
import { ProviderPhotoFindUniqueArgs } from "./ProviderPhotoFindUniqueArgs";
import { ProviderPhoto } from "./ProviderPhoto";
import { Provider } from "../../provider/base/Provider";
import { ProviderPhotoService } from "../providerPhoto.service";

@graphql.Resolver(() => ProviderPhoto)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ProviderPhotoResolverBase {
  constructor(
    protected readonly service: ProviderPhotoService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "ProviderPhoto",
    action: "read",
    possession: "any",
  })
  async _providerPhotosMeta(
    @graphql.Args() args: ProviderPhotoFindManyArgs
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

  @graphql.Query(() => [ProviderPhoto])
  @nestAccessControl.UseRoles({
    resource: "ProviderPhoto",
    action: "read",
    possession: "any",
  })
  async providerPhotos(
    @graphql.Args() args: ProviderPhotoFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderPhoto[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ProviderPhoto",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => ProviderPhoto, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ProviderPhoto",
    action: "read",
    possession: "own",
  })
  async providerPhoto(
    @graphql.Args() args: ProviderPhotoFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderPhoto | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ProviderPhoto",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => ProviderPhoto)
  @nestAccessControl.UseRoles({
    resource: "ProviderPhoto",
    action: "create",
    possession: "any",
  })
  async createProviderPhoto(
    @graphql.Args() args: CreateProviderPhotoArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderPhoto> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ProviderPhoto",
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
        `providing the properties: ${properties} on ${"ProviderPhoto"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        provider: args.data.provider
          ? {
              connect: args.data.provider,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => ProviderPhoto)
  @nestAccessControl.UseRoles({
    resource: "ProviderPhoto",
    action: "update",
    possession: "any",
  })
  async updateProviderPhoto(
    @graphql.Args() args: UpdateProviderPhotoArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderPhoto | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ProviderPhoto",
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
        `providing the properties: ${properties} on ${"ProviderPhoto"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          provider: args.data.provider
            ? {
                connect: args.data.provider,
              }
            : undefined,
        },
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

  @graphql.Mutation(() => ProviderPhoto)
  @nestAccessControl.UseRoles({
    resource: "ProviderPhoto",
    action: "delete",
    possession: "any",
  })
  async deleteProviderPhoto(
    @graphql.Args() args: DeleteProviderPhotoArgs
  ): Promise<ProviderPhoto | null> {
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

  @graphql.ResolveField(() => Provider, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ProviderPhoto",
    action: "read",
    possession: "any",
  })
  async provider(
    @graphql.Parent() parent: ProviderPhoto,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Provider | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Provider",
    });
    const result = await this.service.getProvider(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
