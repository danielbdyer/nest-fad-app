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
import { ConditionService } from "../condition.service";
import { ConditionCreateInput } from "./ConditionCreateInput";
import { ConditionWhereInput } from "./ConditionWhereInput";
import { ConditionWhereUniqueInput } from "./ConditionWhereUniqueInput";
import { ConditionFindManyArgs } from "./ConditionFindManyArgs";
import { ConditionUpdateInput } from "./ConditionUpdateInput";
import { Condition } from "./Condition";
import { ProviderWhereInput } from "../../provider/base/ProviderWhereInput";
import { Provider } from "../../provider/base/Provider";

export class ConditionControllerBase {
  constructor(
    protected readonly service: ConditionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Condition })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: ConditionCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Condition> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Condition",
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
        `providing the properties: ${properties} on ${"Condition"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        specialty: {
          connect: data.specialty,
        },
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Condition] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => ConditionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Condition[]> {
    const args = plainToClass(ConditionFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Condition",
    });
    const results = await this.service.findMany({
      ...args,
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Condition })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: ConditionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Condition | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Condition",
    });
    const result = await this.service.findOne({
      where: params,
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
    resource: "Condition",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Condition })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: ConditionWhereUniqueInput,
    @common.Body()
    data: ConditionUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Condition | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Condition",
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
        `providing the properties: ${properties} on ${"Condition"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          specialty: {
            connect: data.specialty,
          },
        },
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
    resource: "Condition",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Condition })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: ConditionWhereUniqueInput
  ): Promise<Condition | null> {
    try {
      return await this.service.delete({
        where: params,
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
  @common.Get("/:id/provider")
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => ProviderWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyProvider(
    @common.Req() request: Request,
    @common.Param() params: ConditionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Provider[]> {
    const query: ProviderWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Provider",
    });
    const results = await this.service.findProvider(params.id, {
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
  @common.Post("/:id/provider")
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "update",
    possession: "any",
  })
  async createProvider(
    @common.Param() params: ConditionWhereUniqueInput,
    @common.Body() body: ConditionWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      provider: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Condition",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Condition"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/provider")
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "update",
    possession: "any",
  })
  async updateProvider(
    @common.Param() params: ConditionWhereUniqueInput,
    @common.Body() body: ConditionWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      provider: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Condition",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Condition"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/provider")
  @nestAccessControl.UseRoles({
    resource: "Condition",
    action: "update",
    possession: "any",
  })
  async deleteProvider(
    @common.Param() params: ConditionWhereUniqueInput,
    @common.Body() body: ConditionWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      provider: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Condition",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Condition"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
