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
import { SpecialtyService } from "../specialty.service";
import { SpecialtyCreateInput } from "./SpecialtyCreateInput";
import { SpecialtyWhereInput } from "./SpecialtyWhereInput";
import { SpecialtyWhereUniqueInput } from "./SpecialtyWhereUniqueInput";
import { SpecialtyFindManyArgs } from "./SpecialtyFindManyArgs";
import { SpecialtyUpdateInput } from "./SpecialtyUpdateInput";
import { Specialty } from "./Specialty";
import { ConditionWhereInput } from "../../condition/base/ConditionWhereInput";
import { Condition } from "../../condition/base/Condition";
import { ProviderWhereInput } from "../../provider/base/ProviderWhereInput";
import { Provider } from "../../provider/base/Provider";

export class SpecialtyControllerBase {
  constructor(
    protected readonly service: SpecialtyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Specialty })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: SpecialtyCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Specialty> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Specialty",
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
        `providing the properties: ${properties} on ${"Specialty"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        serviceLine: data.serviceLine
          ? {
              connect: data.serviceLine,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,

        serviceLine: {
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
    resource: "Specialty",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Specialty] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SpecialtyFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Specialty[]> {
    const args = plainToClass(SpecialtyFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Specialty",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        id: true,

        serviceLine: {
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
    resource: "Specialty",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Specialty })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: SpecialtyWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Specialty | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Specialty",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,

        serviceLine: {
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
    resource: "Specialty",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Specialty })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: SpecialtyWhereUniqueInput,
    @common.Body()
    data: SpecialtyUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Specialty | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Specialty",
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
        `providing the properties: ${properties} on ${"Specialty"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          serviceLine: data.serviceLine
            ? {
                connect: data.serviceLine,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          id: true,

          serviceLine: {
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
    resource: "Specialty",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Specialty })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: SpecialtyWhereUniqueInput
  ): Promise<Specialty | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          id: true,

          serviceLine: {
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
  @common.Get("/:id/conditions")
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => ConditionWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyConditions(
    @common.Req() request: Request,
    @common.Param() params: SpecialtyWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Condition[]> {
    const query: ConditionWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Condition",
    });
    const results = await this.service.findConditions(params.id, {
      where: query,
      select: {
        name: true,
        createdAt: true,
        id: true,

        specialty: {
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
  @common.Post("/:id/conditions")
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "update",
    possession: "any",
  })
  async createConditions(
    @common.Param() params: SpecialtyWhereUniqueInput,
    @common.Body() body: SpecialtyWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      conditions: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Specialty",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Specialty"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/conditions")
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "update",
    possession: "any",
  })
  async updateConditions(
    @common.Param() params: SpecialtyWhereUniqueInput,
    @common.Body() body: SpecialtyWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      conditions: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Specialty",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Specialty"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/conditions")
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "update",
    possession: "any",
  })
  async deleteConditions(
    @common.Param() params: SpecialtyWhereUniqueInput,
    @common.Body() body: SpecialtyWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      conditions: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Specialty",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Specialty"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/providers")
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => ProviderWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyProviders(
    @common.Req() request: Request,
    @common.Param() params: SpecialtyWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Provider[]> {
    const query: ProviderWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Provider",
    });
    const results = await this.service.findProviders(params.id, {
      where: query,
      select: {
        acceptingNewPatients: true,
        active: true,
        biography: true,
        chatAvailable: true,
        createdAt: true,

        docAsapSchedulingConfiguration: {
          select: {
            id: true,
          },
        },

        email: true,
        employed: true,
        epicReference: true,
        gender: true,
        id: true,
        onlineAppointments: true,

        providerPhotos: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
        videoUrl: true,
        virtualVisits: true,
        website: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/providers")
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "update",
    possession: "any",
  })
  async createProviders(
    @common.Param() params: SpecialtyWhereUniqueInput,
    @common.Body() body: SpecialtyWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      providers: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Specialty",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Specialty"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/providers")
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "update",
    possession: "any",
  })
  async updateProviders(
    @common.Param() params: SpecialtyWhereUniqueInput,
    @common.Body() body: SpecialtyWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      providers: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Specialty",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Specialty"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/providers")
  @nestAccessControl.UseRoles({
    resource: "Specialty",
    action: "update",
    possession: "any",
  })
  async deleteProviders(
    @common.Param() params: SpecialtyWhereUniqueInput,
    @common.Body() body: SpecialtyWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      providers: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Specialty",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Specialty"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
