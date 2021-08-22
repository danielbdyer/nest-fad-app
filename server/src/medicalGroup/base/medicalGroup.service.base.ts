import { PrismaService } from "nestjs-prisma";
import { Prisma, MedicalGroup, Provider } from "@prisma/client";

export class MedicalGroupServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.MedicalGroupFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MedicalGroupFindManyArgs>
  ): Promise<number> {
    return this.prisma.medicalGroup.count(args);
  }

  async findMany<T extends Prisma.MedicalGroupFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.MedicalGroupFindManyArgs>
  ): Promise<MedicalGroup[]> {
    return this.prisma.medicalGroup.findMany(args);
  }
  async findOne<T extends Prisma.MedicalGroupFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.MedicalGroupFindUniqueArgs>
  ): Promise<MedicalGroup | null> {
    return this.prisma.medicalGroup.findUnique(args);
  }
  async create<T extends Prisma.MedicalGroupCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MedicalGroupCreateArgs>
  ): Promise<MedicalGroup> {
    return this.prisma.medicalGroup.create<T>(args);
  }
  async update<T extends Prisma.MedicalGroupUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.MedicalGroupUpdateArgs>
  ): Promise<MedicalGroup> {
    return this.prisma.medicalGroup.update<T>(args);
  }
  async delete<T extends Prisma.MedicalGroupDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.MedicalGroupDeleteArgs>
  ): Promise<MedicalGroup> {
    return this.prisma.medicalGroup.delete(args);
  }

  async findProvider(
    parentId: string,
    args: Prisma.ProviderFindManyArgs
  ): Promise<Provider[]> {
    return this.prisma.medicalGroup
      .findUnique({
        where: { id: parentId },
      })
      .provider(args);
  }
}
