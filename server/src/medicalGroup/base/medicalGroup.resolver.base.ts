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
import { CreateMedicalGroupArgs } from "./CreateMedicalGroupArgs";
import { UpdateMedicalGroupArgs } from "./UpdateMedicalGroupArgs";
import { DeleteMedicalGroupArgs } from "./DeleteMedicalGroupArgs";
import { MedicalGroupFindManyArgs } from "./MedicalGroupFindManyArgs";
import { MedicalGroupFindUniqueArgs } from "./MedicalGroupFindUniqueArgs";
import { MedicalGroup } from "./MedicalGroup";
import { ProviderFindManyArgs } from "../../provider/base/ProviderFindManyArgs";
import { Provider } from "../../provider/base/Provider";
import { MedicalGroupService } from "../medicalGroup.service";

@graphql.Resolver(() => MedicalGroup)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class MedicalGroupResolverBase {
  constructor(
    protected readonly service: MedicalGroupService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "MedicalGroup",
    action: "read",
    possession: "any",
  })
  async _medicalGroupsMeta(
    @graphql.Args() args: MedicalGroupFindManyArgs
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

  @graphql.Query(() => [MedicalGroup])
  @nestAccessControl.UseRoles({
    resource: "MedicalGroup",
    action: "read",
    possession: "any",
  })
  async medicalGroups(
    @graphql.Args() args: MedicalGroupFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MedicalGroup[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "MedicalGroup",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => MedicalGroup, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "MedicalGroup",
    action: "read",
    possession: "own",
  })
  async medicalGroup(
    @graphql.Args() args: MedicalGroupFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MedicalGroup | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "MedicalGroup",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => MedicalGroup)
  @nestAccessControl.UseRoles({
    resource: "MedicalGroup",
    action: "create",
    possession: "any",
  })
  async createMedicalGroup(
    @graphql.Args() args: CreateMedicalGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MedicalGroup> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "MedicalGroup",
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
        `providing the properties: ${properties} on ${"MedicalGroup"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => MedicalGroup)
  @nestAccessControl.UseRoles({
    resource: "MedicalGroup",
    action: "update",
    possession: "any",
  })
  async updateMedicalGroup(
    @graphql.Args() args: UpdateMedicalGroupArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MedicalGroup | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "MedicalGroup",
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
        `providing the properties: ${properties} on ${"MedicalGroup"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => MedicalGroup)
  @nestAccessControl.UseRoles({
    resource: "MedicalGroup",
    action: "delete",
    possession: "any",
  })
  async deleteMedicalGroup(
    @graphql.Args() args: DeleteMedicalGroupArgs
  ): Promise<MedicalGroup | null> {
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
    resource: "MedicalGroup",
    action: "read",
    possession: "any",
  })
  async provider(
    @graphql.Parent() parent: MedicalGroup,
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
