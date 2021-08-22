import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ServiceLineServiceBase } from "./base/serviceLine.service.base";

@Injectable()
export class ServiceLineService extends ServiceLineServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
