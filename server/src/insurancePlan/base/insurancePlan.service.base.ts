import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  InsurancePlan,
  Provider,
  InsuranceCarrier,
} from "@prisma/client";

export class InsurancePlanServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.InsurancePlanFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsurancePlanFindManyArgs>
  ): Promise<number> {
    return this.prisma.insurancePlan.count(args);
  }

  async findMany<T extends Prisma.InsurancePlanFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsurancePlanFindManyArgs>
  ): Promise<InsurancePlan[]> {
    return this.prisma.insurancePlan.findMany(args);
  }
  async findOne<T extends Prisma.InsurancePlanFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsurancePlanFindUniqueArgs>
  ): Promise<InsurancePlan | null> {
    return this.prisma.insurancePlan.findUnique(args);
  }
  async create<T extends Prisma.InsurancePlanCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsurancePlanCreateArgs>
  ): Promise<InsurancePlan> {
    return this.prisma.insurancePlan.create<T>(args);
  }
  async update<T extends Prisma.InsurancePlanUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsurancePlanUpdateArgs>
  ): Promise<InsurancePlan> {
    return this.prisma.insurancePlan.update<T>(args);
  }
  async delete<T extends Prisma.InsurancePlanDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.InsurancePlanDeleteArgs>
  ): Promise<InsurancePlan> {
    return this.prisma.insurancePlan.delete(args);
  }

  async findProvider(
    parentId: string,
    args: Prisma.ProviderFindManyArgs
  ): Promise<Provider[]> {
    return this.prisma.insurancePlan
      .findUnique({
        where: { id: parentId },
      })
      .provider(args);
  }

  async getInsuranceCarrier(
    parentId: string
  ): Promise<InsuranceCarrier | null> {
    return this.prisma.insurancePlan
      .findUnique({
        where: { id: parentId },
      })
      .insuranceCarrier();
  }
}
