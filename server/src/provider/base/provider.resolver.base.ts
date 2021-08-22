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
import { CreateProviderArgs } from "./CreateProviderArgs";
import { UpdateProviderArgs } from "./UpdateProviderArgs";
import { DeleteProviderArgs } from "./DeleteProviderArgs";
import { ProviderFindManyArgs } from "./ProviderFindManyArgs";
import { ProviderFindUniqueArgs } from "./ProviderFindUniqueArgs";
import { Provider } from "./Provider";
import { ConditionFindManyArgs } from "../../condition/base/ConditionFindManyArgs";
import { Condition } from "../../condition/base/Condition";
import { InsuranceCarrierFindManyArgs } from "../../insuranceCarrier/base/InsuranceCarrierFindManyArgs";
import { InsuranceCarrier } from "../../insuranceCarrier/base/InsuranceCarrier";
import { InsurancePlanFindManyArgs } from "../../insurancePlan/base/InsurancePlanFindManyArgs";
import { InsurancePlan } from "../../insurancePlan/base/InsurancePlan";
import { LanguageFindManyArgs } from "../../language/base/LanguageFindManyArgs";
import { Language } from "../../language/base/Language";
import { LocationFindManyArgs } from "../../location/base/LocationFindManyArgs";
import { Location } from "../../location/base/Location";
import { MedicalGroupFindManyArgs } from "../../medicalGroup/base/MedicalGroupFindManyArgs";
import { MedicalGroup } from "../../medicalGroup/base/MedicalGroup";
import { ProviderTypeFindManyArgs } from "../../providerType/base/ProviderTypeFindManyArgs";
import { ProviderType } from "../../providerType/base/ProviderType";
import { SpecialtyFindManyArgs } from "../../specialty/base/SpecialtyFindManyArgs";
import { Specialty } from "../../specialty/base/Specialty";
import { DocAsapSchedulingConfiguration } from "../../docAsapSchedulingConfiguration/base/DocAsapSchedulingConfiguration";
import { ProviderPhoto } from "../../providerPhoto/base/ProviderPhoto";
import { ProviderService } from "../provider.service";

@graphql.Resolver(() => Provider)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class ProviderResolverBase {
  constructor(
    protected readonly service: ProviderService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async _providersMeta(
    @graphql.Args() args: ProviderFindManyArgs
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

  @graphql.Query(() => [Provider])
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async providers(
    @graphql.Args() args: ProviderFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Provider[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Provider",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Provider, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "own",
  })
  async provider(
    @graphql.Args() args: ProviderFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Provider | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Provider",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Provider)
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "create",
    possession: "any",
  })
  async createProvider(
    @graphql.Args() args: CreateProviderArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Provider> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Provider",
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
        `providing the properties: ${properties} on ${"Provider"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        docAsapSchedulingConfiguration: {
          connect: args.data.docAsapSchedulingConfiguration,
        },

        providerPhotos: args.data.providerPhotos
          ? {
              connect: args.data.providerPhotos,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Provider)
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "update",
    possession: "any",
  })
  async updateProvider(
    @graphql.Args() args: UpdateProviderArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Provider | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Provider",
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
        `providing the properties: ${properties} on ${"Provider"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          docAsapSchedulingConfiguration: {
            connect: args.data.docAsapSchedulingConfiguration,
          },

          providerPhotos: args.data.providerPhotos
            ? {
                connect: args.data.providerPhotos,
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

  @graphql.Mutation(() => Provider)
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "delete",
    possession: "any",
  })
  async deleteProvider(
    @graphql.Args() args: DeleteProviderArgs
  ): Promise<Provider | null> {
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
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async conditions(
    @graphql.Parent() parent: Provider,
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

  @graphql.ResolveField(() => [InsuranceCarrier])
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async insuranceCarriers(
    @graphql.Parent() parent: Provider,
    @graphql.Args() args: InsuranceCarrierFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InsuranceCarrier",
    });
    const results = await this.service.findInsuranceCarriers(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [InsurancePlan])
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async insurancePlans(
    @graphql.Parent() parent: Provider,
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

  @graphql.ResolveField(() => [Language])
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async languages(
    @graphql.Parent() parent: Provider,
    @graphql.Args() args: LanguageFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Language[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Language",
    });
    const results = await this.service.findLanguages(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Location])
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async locations(
    @graphql.Parent() parent: Provider,
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

  @graphql.ResolveField(() => [MedicalGroup])
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async medicalGroups(
    @graphql.Parent() parent: Provider,
    @graphql.Args() args: MedicalGroupFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<MedicalGroup[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "MedicalGroup",
    });
    const results = await this.service.findMedicalGroups(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [ProviderType])
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async providerTypes(
    @graphql.Parent() parent: Provider,
    @graphql.Args() args: ProviderTypeFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderType[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ProviderType",
    });
    const results = await this.service.findProviderTypes(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Specialty])
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async specialty(
    @graphql.Parent() parent: Provider,
    @graphql.Args() args: SpecialtyFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Specialty[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Specialty",
    });
    const results = await this.service.findSpecialty(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => DocAsapSchedulingConfiguration, {
    nullable: true,
  })
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async docAsapSchedulingConfiguration(
    @graphql.Parent() parent: Provider,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<DocAsapSchedulingConfiguration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DocAsapSchedulingConfiguration",
    });
    const result = await this.service.getDocAsapSchedulingConfiguration(
      parent.id
    );

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => ProviderPhoto, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Provider",
    action: "read",
    possession: "any",
  })
  async providerPhotos(
    @graphql.Parent() parent: Provider,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ProviderPhoto | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ProviderPhoto",
    });
    const result = await this.service.getProviderPhotos(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
