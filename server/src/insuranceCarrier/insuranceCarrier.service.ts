import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { InsuranceCarrierServiceBase } from "./base/insuranceCarrier.service.base";

@Injectable()
export class InsuranceCarrierService extends InsuranceCarrierServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
