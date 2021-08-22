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
import { CreateDocAsapSchedulingConfigurationArgs } from "./CreateDocAsapSchedulingConfigurationArgs";
import { UpdateDocAsapSchedulingConfigurationArgs } from "./UpdateDocAsapSchedulingConfigurationArgs";
import { DeleteDocAsapSchedulingConfigurationArgs } from "./DeleteDocAsapSchedulingConfigurationArgs";
import { DocAsapSchedulingConfigurationFindManyArgs } from "./DocAsapSchedulingConfigurationFindManyArgs";
import { DocAsapSchedulingConfigurationFindUniqueArgs } from "./DocAsapSchedulingConfigurationFindUniqueArgs";
import { DocAsapSchedulingConfiguration } from "./DocAsapSchedulingConfiguration";
import { Provider } from "../../provider/base/Provider";
import { DocAsapSchedulingConfigurationService } from "../docAsapSchedulingConfiguration.service";

@graphql.Resolver(() => DocAsapSchedulingConfiguration)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class DocAsapSchedulingConfigurationResolverBase {
  constructor(
    protected readonly service: DocAsapSchedulingConfigurationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "read",
    possession: "any",
  })
  async _docAsapSchedulingConfigurationsMeta(
    @graphql.Args() args: DocAsapSchedulingConfigurationFindManyArgs
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

  @graphql.Query(() => [DocAsapSchedulingConfiguration])
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "read",
    possession: "any",
  })
  async docAsapSchedulingConfigurations(
    @graphql.Args() args: DocAsapSchedulingConfigurationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DocAsapSchedulingConfiguration[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DocAsapSchedulingConfiguration",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => DocAsapSchedulingConfiguration, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "read",
    possession: "own",
  })
  async docAsapSchedulingConfiguration(
    @graphql.Args() args: DocAsapSchedulingConfigurationFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DocAsapSchedulingConfiguration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "DocAsapSchedulingConfiguration",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => DocAsapSchedulingConfiguration)
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "create",
    possession: "any",
  })
  async createDocAsapSchedulingConfiguration(
    @graphql.Args() args: CreateDocAsapSchedulingConfigurationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DocAsapSchedulingConfiguration> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "DocAsapSchedulingConfiguration",
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
        `providing the properties: ${properties} on ${"DocAsapSchedulingConfiguration"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        provider: {
          connect: args.data.provider,
        },
      },
    });
  }

  @graphql.Mutation(() => DocAsapSchedulingConfiguration)
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "update",
    possession: "any",
  })
  async updateDocAsapSchedulingConfiguration(
    @graphql.Args() args: UpdateDocAsapSchedulingConfigurationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DocAsapSchedulingConfiguration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "DocAsapSchedulingConfiguration",
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
        `providing the properties: ${properties} on ${"DocAsapSchedulingConfiguration"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          provider: {
            connect: args.data.provider,
          },
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

  @graphql.Mutation(() => DocAsapSchedulingConfiguration)
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "delete",
    possession: "any",
  })
  async deleteDocAsapSchedulingConfiguration(
    @graphql.Args() args: DeleteDocAsapSchedulingConfigurationArgs
  ): Promise<DocAsapSchedulingConfiguration | null> {
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
    resource: "DocAsapSchedulingConfiguration",
    action: "read",
    possession: "any",
  })
  async provider(
    @graphql.Parent() parent: DocAsapSchedulingConfiguration,
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
