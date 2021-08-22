import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { InsurancePlanServiceBase } from "./base/insurancePlan.service.base";

@Injectable()
export class InsurancePlanService extends InsurancePlanServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
