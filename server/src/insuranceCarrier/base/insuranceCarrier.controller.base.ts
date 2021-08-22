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
import { InsuranceCarrierService } from "../insuranceCarrier.service";
import { InsuranceCarrierCreateInput } from "./InsuranceCarrierCreateInput";
import { InsuranceCarrierWhereInput } from "./InsuranceCarrierWhereInput";
import { InsuranceCarrierWhereUniqueInput } from "./InsuranceCarrierWhereUniqueInput";
import { InsuranceCarrierFindManyArgs } from "./InsuranceCarrierFindManyArgs";
import { InsuranceCarrierUpdateInput } from "./InsuranceCarrierUpdateInput";
import { InsuranceCarrier } from "./InsuranceCarrier";
import { InsurancePlanWhereInput } from "../../insurancePlan/base/InsurancePlanWhereInput";
import { InsurancePlan } from "../../insurancePlan/base/InsurancePlan";
import { ProviderWhereInput } from "../../provider/base/ProviderWhereInput";
import { Provider } from "../../provider/base/Provider";

export class InsuranceCarrierControllerBase {
  constructor(
    protected readonly service: InsuranceCarrierService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: InsuranceCarrier })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: InsuranceCarrierCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "InsuranceCarrier",
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
        `providing the properties: ${properties} on ${"InsuranceCarrier"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        createdAt: true,
        id: true,
        code: true,
        name: true,
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
    resource: "InsuranceCarrier",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [InsuranceCarrier] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => InsuranceCarrierFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier[]> {
    const args = plainToClass(InsuranceCarrierFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InsuranceCarrier",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        id: true,
        code: true,
        name: true,
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
    resource: "InsuranceCarrier",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: InsuranceCarrier })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "InsuranceCarrier",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,
        code: true,
        name: true,
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
    resource: "InsuranceCarrier",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: InsuranceCarrier })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
    @common.Body()
    data: InsuranceCarrierUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<InsuranceCarrier | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "InsuranceCarrier",
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
        `providing the properties: ${properties} on ${"InsuranceCarrier"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          code: true,
          name: true,
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
    resource: "InsuranceCarrier",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: InsuranceCarrier })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: InsuranceCarrierWhereUniqueInput
  ): Promise<InsuranceCarrier | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          id: true,
          code: true,
          name: true,
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
  @common.Get("/:id/insurancePlans")
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => InsurancePlanWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyInsurancePlans(
    @common.Req() request: Request,
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<InsurancePlan[]> {
    const query: InsurancePlanWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "InsurancePlan",
    });
    const results = await this.service.findInsurancePlans(params.id, {
      where: query,
      select: {
        createdAt: true,
        id: true,

        insuranceCarrier: {
          select: {
            id: true,
          },
        },

        code: true,
        name: true,
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
  @common.Post("/:id/insurancePlans")
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "update",
    possession: "any",
  })
  async createInsurancePlans(
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
    @common.Body() body: InsuranceCarrierWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      insurancePlans: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "InsuranceCarrier",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"InsuranceCarrier"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/insurancePlans")
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "update",
    possession: "any",
  })
  async updateInsurancePlans(
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
    @common.Body() body: InsuranceCarrierWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      insurancePlans: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "InsuranceCarrier",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"InsuranceCarrier"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/insurancePlans")
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
    action: "update",
    possession: "any",
  })
  async deleteInsurancePlans(
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
    @common.Body() body: InsuranceCarrierWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      insurancePlans: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "InsuranceCarrier",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"InsuranceCarrier"} is forbidden for roles: ${roles}`
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
  @common.Get("/:id/provider")
  @nestAccessControl.UseRoles({
    resource: "InsuranceCarrier",
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
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
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
    resource: "InsuranceCarrier",
    action: "update",
    possession: "any",
  })
  async createProvider(
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
    @common.Body() body: InsuranceCarrierWhereUniqueInput[],
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
      resource: "InsuranceCarrier",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"InsuranceCarrier"} is forbidden for roles: ${roles}`
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
    resource: "InsuranceCarrier",
    action: "update",
    possession: "any",
  })
  async updateProvider(
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
    @common.Body() body: InsuranceCarrierWhereUniqueInput[],
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
      resource: "InsuranceCarrier",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"InsuranceCarrier"} is forbidden for roles: ${roles}`
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
    resource: "InsuranceCarrier",
    action: "update",
    possession: "any",
  })
  async deleteProvider(
    @common.Param() params: InsuranceCarrierWhereUniqueInput,
    @common.Body() body: InsuranceCarrierWhereUniqueInput[],
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
      resource: "InsuranceCarrier",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"InsuranceCarrier"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
