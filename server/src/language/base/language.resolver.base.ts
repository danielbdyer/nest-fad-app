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
import { CreateLanguageArgs } from "./CreateLanguageArgs";
import { UpdateLanguageArgs } from "./UpdateLanguageArgs";
import { DeleteLanguageArgs } from "./DeleteLanguageArgs";
import { LanguageFindManyArgs } from "./LanguageFindManyArgs";
import { LanguageFindUniqueArgs } from "./LanguageFindUniqueArgs";
import { Language } from "./Language";
import { ProviderFindManyArgs } from "../../provider/base/ProviderFindManyArgs";
import { Provider } from "../../provider/base/Provider";
import { LanguageService } from "../language.service";

@graphql.Resolver(() => Language)
@common.UseGuards(
  gqlDefaultAuthGuard.GqlDefaultAuthGuard,
  gqlACGuard.GqlACGuard
)
export class LanguageResolverBase {
  constructor(
    protected readonly service: LanguageService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Language",
    action: "read",
    possession: "any",
  })
  async _languagesMeta(
    @graphql.Args() args: LanguageFindManyArgs
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

  @graphql.Query(() => [Language])
  @nestAccessControl.UseRoles({
    resource: "Language",
    action: "read",
    possession: "any",
  })
  async languages(
    @graphql.Args() args: LanguageFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Language[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Language",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Language, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Language",
    action: "read",
    possession: "own",
  })
  async language(
    @graphql.Args() args: LanguageFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Language | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Language",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Language)
  @nestAccessControl.UseRoles({
    resource: "Language",
    action: "create",
    possession: "any",
  })
  async createLanguage(
    @graphql.Args() args: CreateLanguageArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Language> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Language",
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
        `providing the properties: ${properties} on ${"Language"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Language)
  @nestAccessControl.UseRoles({
    resource: "Language",
    action: "update",
    possession: "any",
  })
  async updateLanguage(
    @graphql.Args() args: UpdateLanguageArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Language | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Language",
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
        `providing the properties: ${properties} on ${"Language"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Language)
  @nestAccessControl.UseRoles({
    resource: "Language",
    action: "delete",
    possession: "any",
  })
  async deleteLanguage(
    @graphql.Args() args: DeleteLanguageArgs
  ): Promise<Language | null> {
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
    resource: "Language",
    action: "read",
    possession: "any",
  })
  async provider(
    @graphql.Parent() parent: Language,
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
