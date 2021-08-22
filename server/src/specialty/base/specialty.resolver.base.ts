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
import { CreateSpecialtyArgs } from "./CreateSpecialtyArgs";
import { UpdateSpecialtyArgs } from "./UpdateSpecialtyArgs";
import { DeleteSpecialtyArgs } from "./DeleteSpecialtyArgs";
import { SpecialtyFindManyArgs } from "./SpecialtyFindManyArgs";
import { SpecialtyFindUniqueArgs } from "./SpecialtyFindUniqueArgs";
import { Specialty } from "./Specialty";
import { ConditionFindManyArgs } from "../../condition/base/ConditionFindManyArgs";
import { Condition } from "../../condition/base/Condition";
import { ProviderFindManyArgs } from "../../provider/base/ProviderFindManyArgs";
import { Provider } from "../../provider/base/Provider";
import { ServiceLine } from "../../serviceLine/base/ServiceLine";
import { SpecialtyService } from "../specialty.service";

@graphql.Resolver(() => Specialty)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class SpecialtyResolverBase {
  constructor(
    protected readonly service: SpecialtyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "read",
    possession: "any",
  })
  async _specialtiesMeta(
    @graphql.Args() args: SpecialtyFindManyArgs
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

  @graphql.Query(() => [Specialty])
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "read",
    possession: "any",
  })
  async specialties(
    @graphql.Args() args: SpecialtyFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Specialty[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Specialty",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Specialty, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "read",
    possession: "own",
  })
  async specialty(
    @graphql.Args() args: SpecialtyFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Specialty | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Specialty",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Specialty)
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "create",
    possession: "any",
  })
  async createSpecialty(
    @graphql.Args() args: CreateSpecialtyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Specialty> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Specialty",
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
        `providing the properties: ${properties} on ${"Specialty"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        serviceLine: args.data.serviceLine
          ? {
              connect: args.data.serviceLine,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Specialty)
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "update",
    possession: "any",
  })
  async updateSpecialty(
    @graphql.Args() args: UpdateSpecialtyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Specialty | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Specialty",
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
        `providing the properties: ${properties} on ${"Specialty"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          serviceLine: args.data.serviceLine
            ? {
                connect: args.data.serviceLine,
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

  @graphql.Mutation(() => Specialty)
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "delete",
    possession: "any",
  })
  async deleteSpecialty(
    @graphql.Args() args: DeleteSpecialtyArgs
  ): Promise<Specialty | null> {
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

  @graphql.ResolveField(() => [Condition])
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "read",
    possession: "any",
  })
  async conditions(
    @graphql.Parent() parent: Specialty,
    @graphql.Args() args: ConditionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Condition[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Condition",
    });
    const results = await this.service.findConditions(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Provider])
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "read",
    possession: "any",
  })
  async providers(
    @graphql.Parent() parent: Specialty,
    @graphql.Args() args: ProviderFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Provider[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Provider",
    });
    const results = await this.service.findProviders(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => ServiceLine, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "read",
    possession: "any",
  })
  async serviceLine(
    @graphql.Parent() parent: Specialty,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ServiceLine | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ServiceLine",
    });
    const result = await this.service.getServiceLine(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
