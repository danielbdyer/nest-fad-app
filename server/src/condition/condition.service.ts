import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ConditionServiceBase } from "./base/condition.service.base";

@Injectable()
export class ConditionService extends ConditionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
