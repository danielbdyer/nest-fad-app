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
import { ServiceLineService } from "../serviceLine.service";
import { ServiceLineCreateInput } from "./ServiceLineCreateInput";
import { ServiceLineWhereInput } from "./ServiceLineWhereInput";
import { ServiceLineWhereUniqueInput } from "./ServiceLineWhereUniqueInput";
import { ServiceLineFindManyArgs } from "./ServiceLineFindManyArgs";
import { ServiceLineUpdateInput } from "./ServiceLineUpdateInput";
import { ServiceLine } from "./ServiceLine";
import { LocationWhereInput } from "../../location/base/LocationWhereInput";
import { Location } from "../../location/base/Location";
import { SpecialtyWhereInput } from "../../specialty/base/SpecialtyWhereInput";
import { Specialty } from "../../specialty/base/Specialty";

export class ServiceLineControllerBase {
  constructor(
    protected readonly service: ServiceLineService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: ServiceLine })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: ServiceLineCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ServiceLine> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ServiceLine",
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
        `providing the properties: ${properties} on ${"ServiceLine"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        createdAt: true,
        id: true,
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
    resource: "ServiceLine",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [ServiceLine] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => ServiceLineFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ServiceLine[]> {
    const args = plainToClass(ServiceLineFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ServiceLine",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        id: true,
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
    resource: "ServiceLine",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: ServiceLine })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: ServiceLineWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ServiceLine | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ServiceLine",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,
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
    resource: "ServiceLine",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ServiceLine })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: ServiceLineWhereUniqueInput,
    @common.Body()
    data: ServiceLineUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ServiceLine | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ServiceLine",
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
        `providing the properties: ${properties} on ${"ServiceLine"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
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
    resource: "ServiceLine",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ServiceLine })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: ServiceLineWhereUniqueInput
  ): Promise<ServiceLine | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          id: true,
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
  @common.Get("/:id/locations")
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => LocationWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyLocations(
    @common.Req() request: Request,
    @common.Param() params: ServiceLineWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Location[]> {
    const query: LocationWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Location",
    });
    const results = await this.service.findLocations(params.id, {
      where: query,
      select: {
        addressLine_1: true,
        addressLine_2: true,
        city: true,
        createdAt: true,
        friday: true,
        id: true,

        locationType: {
          select: {
            id: true,
          },
        },

        monday: true,
        saturday: true,
        state: true,
        sunday: true,
        thursday: true,
        tuesday: true,
        updatedAt: true,
        wednesday: true,
        zip: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/locations")
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "update",
    possession: "any",
  })
  async createLocations(
    @common.Param() params: ServiceLineWhereUniqueInput,
    @common.Body() body: ServiceLineWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      locations: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ServiceLine",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ServiceLine"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/locations")
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "update",
    possession: "any",
  })
  async updateLocations(
    @common.Param() params: ServiceLineWhereUniqueInput,
    @common.Body() body: ServiceLineWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      locations: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ServiceLine",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ServiceLine"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/locations")
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "update",
    possession: "any",
  })
  async deleteLocations(
    @common.Param() params: ServiceLineWhereUniqueInput,
    @common.Body() body: ServiceLineWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      locations: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ServiceLine",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ServiceLine"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/specialties")
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => SpecialtyWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManySpecialties(
    @common.Req() request: Request,
    @common.Param() params: ServiceLineWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Specialty[]> {
    const query: SpecialtyWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Specialty",
    });
    const results = await this.service.findSpecialties(params.id, {
      where: query,
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
  @common.Post("/:id/specialties")
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "update",
    possession: "any",
  })
  async createSpecialties(
    @common.Param() params: ServiceLineWhereUniqueInput,
    @common.Body() body: ServiceLineWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      specialties: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ServiceLine",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ServiceLine"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/specialties")
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "update",
    possession: "any",
  })
  async updateSpecialties(
    @common.Param() params: ServiceLineWhereUniqueInput,
    @common.Body() body: ServiceLineWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      specialties: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ServiceLine",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ServiceLine"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/specialties")
  @nestAccessControl.UseRoles({
    resource: "ServiceLine",
    action: "update",
    possession: "any",
  })
  async deleteSpecialties(
    @common.Param() params: ServiceLineWhereUniqueInput,
    @common.Body() body: ServiceLineWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      specialties: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ServiceLine",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"ServiceLine"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
