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
import { ProviderPhotoService } from "../providerPhoto.service";
import { ProviderPhotoCreateInput } from "./ProviderPhotoCreateInput";
import { ProviderPhotoWhereInput } from "./ProviderPhotoWhereInput";
import { ProviderPhotoWhereUniqueInput } from "./ProviderPhotoWhereUniqueInput";
import { ProviderPhotoFindManyArgs } from "./ProviderPhotoFindManyArgs";
import { ProviderPhotoUpdateInput } from "./ProviderPhotoUpdateInput";
import { ProviderPhoto } from "./ProviderPhoto";

export class ProviderPhotoControllerBase {
  constructor(
    protected readonly service: ProviderPhotoService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "ProviderPhoto",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: ProviderPhoto })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: ProviderPhotoCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ProviderPhoto> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ProviderPhoto",
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
        `providing the properties: ${properties} on ${"ProviderPhoto"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        provider: data.provider
          ? {
              connect: data.provider,
            }
          : undefined,
      },
      select: {
        createdAt: true,
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
    resource: "ProviderPhoto",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [ProviderPhoto] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => ProviderPhotoFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ProviderPhoto[]> {
    const args = plainToClass(ProviderPhotoFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ProviderPhoto",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
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
    resource: "ProviderPhoto",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: ProviderPhoto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: ProviderPhotoWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ProviderPhoto | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ProviderPhoto",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
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
    resource: "ProviderPhoto",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ProviderPhoto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: ProviderPhotoWhereUniqueInput,
    @common.Body()
    data: ProviderPhotoUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ProviderPhoto | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ProviderPhoto",
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
        `providing the properties: ${properties} on ${"ProviderPhoto"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          provider: data.provider
            ? {
                connect: data.provider,
              }
            : undefined,
        },
        select: {
          createdAt: true,
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
    resource: "ProviderPhoto",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ProviderPhoto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: ProviderPhotoWhereUniqueInput
  ): Promise<ProviderPhoto | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
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
