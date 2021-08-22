import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  InsuranceCarrier,
  InsurancePlan,
  Provider,
} from "@prisma/client";

export class InsuranceCarrierServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.InsuranceCarrierFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsuranceCarrierFindManyArgs>
  ): Promise<number> {
    return this.prisma.insuranceCarrier.count(args);
  }

  async findMany<T extends Prisma.InsuranceCarrierFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsuranceCarrierFindManyArgs>
  ): Promise<InsuranceCarrier[]> {
    return this.prisma.insuranceCarrier.findMany(args);
  }
  async findOne<T extends Prisma.InsuranceCarrierFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsuranceCarrierFindUniqueArgs>
  ): Promise<InsuranceCarrier | null> {
    return this.prisma.insuranceCarrier.findUnique(args);
  }
  async create<T extends Prisma.InsuranceCarrierCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsuranceCarrierCreateArgs>
  ): Promise<InsuranceCarrier> {
    return this.prisma.insuranceCarrier.create<T>(args);
  }
  async update<T extends Prisma.InsuranceCarrierUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsuranceCarrierUpdateArgs>
  ): Promise<InsuranceCarrier> {
    return this.prisma.insuranceCarrier.update<T>(args);
  }
  async delete<T extends Prisma.InsuranceCarrierDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsuranceCarrierDeleteArgs>
  ): Promise<InsuranceCarrier> {
    return this.prisma.insuranceCarrier.delete(args);
  }

  async findInsurancePlans(
    parentId: string,
    args: Prisma.InsurancePlanFindManyArgs
  ): Promise<InsurancePlan[]> {
    return this.prisma.insuranceCarrier
      .findUnique({
        where: { id: parentId },
      })
      .insurancePlans(args);
  }

  async findProvider(
    parentId: string,
    args: Prisma.ProviderFindManyArgs
  ): Promise<Provider[]> {
    return this.prisma.insuranceCarrier
      .findUnique({
        where: { id: parentId },
      })
      .provider(args);
  }
}
