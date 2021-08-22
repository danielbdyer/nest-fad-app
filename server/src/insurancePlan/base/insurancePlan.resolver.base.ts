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
import { CreateInsurancePlanArgs } from "./CreateInsurancePlanArgs";
import { UpdateInsurancePlanArgs } from "./UpdateInsurancePlanArgs";
import { DeleteInsurancePlanArgs } from "./DeleteInsurancePlanArgs";
import { InsurancePlanFindManyArgs } from "./InsurancePlanFindManyArgs";
import { InsurancePlanFindUniqueArgs } from "./InsurancePlanFindUniqueArgs";
import { InsurancePlan } from "./InsurancePlan";
import { ProviderFindManyArgs } from "../../provider/base/ProviderFindManyArgs";
import { Provider } from "../../provider/base/Provider";
import { InsuranceCarrier } from "../../insuranceCarrier/base/InsuranceCarrier";
import { InsurancePlanService } from "../insurancePlan.service";

@graphql.Resolver(() => InsurancePlan)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class InsurancePlanResolverBase {
  constructor(
    protected readonly service: InsurancePlanService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "InsurancePlan",
    action: "read",
    possession: "any",
  })
  async _insurancePlansMeta(
    @graphql.Args() args: InsurancePlanFindManyArgs
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

  @graphql.Query(() => [InsurancePlan])
  @nestAccessControl.UseRoles({
    resource: "InsurancePlan",
    action: "read",
    possession: "any",
  })
  async insurancePlans(
    @graphql.Args() args: InsurancePlanFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsurancePlan[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InsurancePlan",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => InsurancePlan, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "InsurancePlan",
    action: "read",
    possession: "own",
  })
  async insurancePlan(
    @graphql.Args() args: InsurancePlanFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsurancePlan | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "InsurancePlan",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => InsurancePlan)
  @nestAccessControl.UseRoles({
    resource: "InsurancePlan",
    action: "create",
    possession: "any",
  })
  async createInsurancePlan(
    @graphql.Args() args: CreateInsurancePlanArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsurancePlan> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "InsurancePlan",
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
        `providing the properties: ${properties} on ${"InsurancePlan"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        insuranceCarrier: {
          connect: args.data.insuranceCarrier,
        },
      },
    });
  }

  @graphql.Mutation(() => InsurancePlan)
  @nestAccessControl.UseRoles({
    resource: "InsurancePlan",
    action: "update",
    possession: "any",
  })
  async updateInsurancePlan(
    @graphql.Args() args: UpdateInsurancePlanArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsurancePlan | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "InsurancePlan",
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
        `providing the properties: ${properties} on ${"InsurancePlan"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          insuranceCarrier: {
            connect: args.data.insuranceCarrier,
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

  @graphql.Mutation(() => InsurancePlan)
  @nestAccessControl.UseRoles({
    resource: "InsurancePlan",
    action: "delete",
    possession: "any",
  })
  async deleteInsurancePlan(
    @graphql.Args() args: DeleteInsurancePlanArgs
  ): Promise<InsurancePlan | null> {
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
    resource: "InsurancePlan",
    action: "read",
    possession: "any",
  })
  async provider(
    @graphql.Parent() parent: InsurancePlan,
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

  @graphql.ResolveField(() => InsuranceCarrier, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "InsurancePlan",
    action: "read",
    possession: "any",
  })
  async insuranceCarrier(
    @graphql.Parent() parent: InsurancePlan,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InsuranceCarrier",
    });
    const result = await this.service.getInsuranceCarrier(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
