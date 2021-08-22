import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DocAsapSchedulingConfigurationServiceBase } from "./base/docAsapSchedulingConfiguration.service.base";

@Injectable()
export class DocAsapSchedulingConfigurationService extends DocAsapSchedulingConfigurationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
