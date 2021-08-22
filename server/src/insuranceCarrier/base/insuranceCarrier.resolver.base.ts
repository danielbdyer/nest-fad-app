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
import { CreateInsuranceCarrierArgs } from "./CreateInsuranceCarrierArgs";
import { UpdateInsuranceCarrierArgs } from "./UpdateInsuranceCarrierArgs";
import { DeleteInsuranceCarrierArgs } from "./DeleteInsuranceCarrierArgs";
import { InsuranceCarrierFindManyArgs } from "./InsuranceCarrierFindManyArgs";
import { InsuranceCarrierFindUniqueArgs } from "./InsuranceCarrierFindUniqueArgs";
import { InsuranceCarrier } from "./InsuranceCarrier";
import { InsurancePlanFindManyArgs } from "../../insurancePlan/base/InsurancePlanFindManyArgs";
import { InsurancePlan } from "../../insurancePlan/base/InsurancePlan";
import { ProviderFindManyArgs } from "../../provider/base/ProviderFindManyArgs";
import { Provider } from "../../provider/base/Provider";
import { InsuranceCarrierService } from "../insuranceCarrier.service";

@graphql.Resolver(() => InsuranceCarrier)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class InsuranceCarrierResolverBase {
  constructor(
    protected readonly service: InsuranceCarrierService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "read",
    possession: "any",
  })
  async _insuranceCarriersMeta(
    @graphql.Args() args: InsuranceCarrierFindManyArgs
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

  @graphql.Query(() => [InsuranceCarrier])
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "read",
    possession: "any",
  })
  async insuranceCarriers(
    @graphql.Args() args: InsuranceCarrierFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InsuranceCarrier",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => InsuranceCarrier, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "read",
    possession: "own",
  })
  async insuranceCarrier(
    @graphql.Args() args: InsuranceCarrierFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "InsuranceCarrier",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => InsuranceCarrier)
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "create",
    possession: "any",
  })
  async createInsuranceCarrier(
    @graphql.Args() args: CreateInsuranceCarrierArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "InsuranceCarrier",
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
        `providing the properties: ${properties} on ${"InsuranceCarrier"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => InsuranceCarrier)
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "update",
    possession: "any",
  })
  async updateInsuranceCarrier(
    @graphql.Args() args: UpdateInsuranceCarrierArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "InsuranceCarrier",
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
        `providing the properties: ${properties} on ${"InsuranceCarrier"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => InsuranceCarrier)
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "delete",
    possession: "any",
  })
  async deleteInsuranceCarrier(
    @graphql.Args() args: DeleteInsuranceCarrierArgs
  ): Promise<InsuranceCarrier | null> {
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

  @graphql.ResolveField(() => [InsurancePlan])
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "read",
    possession: "any",
  })
  async insurancePlans(
    @graphql.Parent() parent: InsuranceCarrier,
    @graphql.Args() args: InsurancePlanFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsurancePlan[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InsurancePlan",
    });
    const results = await this.service.findInsurancePlans(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Provider])
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "read",
    possession: "any",
  })
  async provider(
    @graphql.Parent() parent: InsuranceCarrier,
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
