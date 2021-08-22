import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { DocAsapSchedulingConfigurationService } from "../docAsapSchedulingConfiguration.service";
import { DocAsapSchedulingConfigurationCreateInput } from "./DocAsapSchedulingConfigurationCreateInput";
import { DocAsapSchedulingConfigurationWhereInput } from "./DocAsapSchedulingConfigurationWhereInput";
import { DocAsapSchedulingConfigurationWhereUniqueInput } from "./DocAsapSchedulingConfigurationWhereUniqueInput";
import { DocAsapSchedulingConfigurationFindManyArgs } from "./DocAsapSchedulingConfigurationFindManyArgs";
import { DocAsapSchedulingConfigurationUpdateInput } from "./DocAsapSchedulingConfigurationUpdateInput";
import { DocAsapSchedulingConfiguration } from "./DocAsapSchedulingConfiguration";

export class DocAsapSchedulingConfigurationControllerBase {
  constructor(
    protected readonly service: DocAsapSchedulingConfigurationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: DocAsapSchedulingConfiguration })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: DocAsapSchedulingConfigurationCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DocAsapSchedulingConfiguration> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "DocAsapSchedulingConfiguration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"DocAsapSchedulingConfiguration"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        provider: {
          connect: data.provider,
        },
      },
      select: {
        createdAt: true,
        docAsapId: true,
        id: true,

        provider: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [DocAsapSchedulingConfiguration] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => DocAsapSchedulingConfigurationFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DocAsapSchedulingConfiguration[]> {
    const args = plainToClass(
      DocAsapSchedulingConfigurationFindManyArgs,
      request.query
    );

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "DocAsapSchedulingConfiguration",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        docAsapId: true,
        id: true,

        provider: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: DocAsapSchedulingConfiguration })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: DocAsapSchedulingConfigurationWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DocAsapSchedulingConfiguration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "DocAsapSchedulingConfiguration",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        docAsapId: true,
        id: true,

        provider: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: DocAsapSchedulingConfiguration })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: DocAsapSchedulingConfigurationWhereUniqueInput,
    @common.Body()
    data: DocAsapSchedulingConfigurationUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<DocAsapSchedulingConfiguration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "DocAsapSchedulingConfiguration",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"DocAsapSchedulingConfiguration"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          provider: {
            connect: data.provider,
          },
        },
        select: {
          createdAt: true,
          docAsapId: true,
          id: true,

          provider: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "DocAsapSchedulingConfiguration",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: DocAsapSchedulingConfiguration })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: DocAsapSchedulingConfigurationWhereUniqueInput
  ): Promise<DocAsapSchedulingConfiguration | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          docAsapId: true,
          id: true,

          provider: {
            select: {
              id: true,
            },
          },

          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
