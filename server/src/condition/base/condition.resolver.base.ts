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
import { CreateConditionArgs } from "./CreateConditionArgs";
import { UpdateConditionArgs } from "./UpdateConditionArgs";
import { DeleteConditionArgs } from "./DeleteConditionArgs";
import { ConditionFindManyArgs } from "./ConditionFindManyArgs";
import { ConditionFindUniqueArgs } from "./ConditionFindUniqueArgs";
import { Condition } from "./Condition";
import { ProviderFindManyArgs } from "../../provider/base/ProviderFindManyArgs";
import { Provider } from "../../provider/base/Provider";
import { Specialty } from "../../specialty/base/Specialty";
import { ConditionService } from "../condition.service";

@graphql.Resolver(() => Condition)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ConditionResolverBase {
  constructor(
    protected readonly service: ConditionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "read",
    possession: "any",
  })
  async _conditionsMeta(
    @graphql.Args() args: ConditionFindManyArgs
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

  @graphql.Query(() => [Condition])
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "read",
    possession: "any",
  })
  async conditions(
    @graphql.Args() args: ConditionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Condition[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Condition",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Condition, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "read",
    possession: "own",
  })
  async condition(
    @graphql.Args() args: ConditionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Condition | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Condition",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Condition)
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "create",
    possession: "any",
  })
  async createCondition(
    @graphql.Args() args: CreateConditionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Condition> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Condition",
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
        `providing the properties: ${properties} on ${"Condition"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        specialty: {
          connect: args.data.specialty,
        },
      },
    });
  }

  @graphql.Mutation(() => Condition)
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "update",
    possession: "any",
  })
  async updateCondition(
    @graphql.Args() args: UpdateConditionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Condition | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Condition",
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
        `providing the properties: ${properties} on ${"Condition"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          specialty: {
            connect: args.data.specialty,
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

  @graphql.Mutation(() => Condition)
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "delete",
    possession: "any",
  })
  async deleteCondition(
    @graphql.Args() args: DeleteConditionArgs
  ): Promise<Condition | null> {
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
    resource: "Condition",
    action: "read",
    possession: "any",
  })
  async provider(
    @graphql.Parent() parent: Condition,
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

  @graphql.ResolveField(() => Specialty, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "read",
    possession: "any",
  })
  async specialty(
    @graphql.Parent() parent: Condition,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Specialty | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Specialty",
    });
    const result = await this.service.getSpecialty(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
