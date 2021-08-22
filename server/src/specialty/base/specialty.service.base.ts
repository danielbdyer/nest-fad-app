import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  Specialty,
  Condition,
  Provider,
  ServiceLine,
} from "@prisma/client";

export class SpecialtyServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SpecialtyFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpecialtyFindManyArgs>
  ): Promise<number> {
    return this.prisma.specialty.count(args);
  }

  async findMany<T extends Prisma.SpecialtyFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpecialtyFindManyArgs>
  ): Promise<Specialty[]> {
    return this.prisma.specialty.findMany(args);
  }
  async findOne<T extends Prisma.SpecialtyFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpecialtyFindUniqueArgs>
  ): Promise<Specialty | null> {
    return this.prisma.specialty.findUnique(args);
  }
  async create<T extends Prisma.SpecialtyCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpecialtyCreateArgs>
  ): Promise<Specialty> {
    return this.prisma.specialty.create<T>(args);
  }
  async update<T extends Prisma.SpecialtyUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpecialtyUpdateArgs>
  ): Promise<Specialty> {
    return this.prisma.specialty.update<T>(args);
  }
  async delete<T extends Prisma.SpecialtyDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SpecialtyDeleteArgs>
  ): Promise<Specialty> {
    return this.prisma.specialty.delete(args);
  }

  async findConditions(
    parentId: string,
    args: Prisma.ConditionFindManyArgs
  ): Promise<Condition[]> {
    return this.prisma.specialty
      .findUnique({
        where: { id: parentId },
      })
      .conditions(args);
  }

  async findProviders(
    parentId: string,
    args: Prisma.ProviderFindManyArgs
  ): Promise<Provider[]> {
    return this.prisma.specialty
      .findUnique({
        where: { id: parentId },
      })
      .providers(args);
  }

  async getServiceLine(parentId: string): Promise<ServiceLine | null> {
    return this.prisma.specialty
      .findUnique({
        where: { id: parentId },
      })
      .serviceLine();
  }
}
