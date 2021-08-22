import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ProviderTypeServiceBase } from "./base/providerType.service.base";

@Injectable()
export class ProviderTypeService extends ProviderTypeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
