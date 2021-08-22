import { PrismaService } from "nestjs-prisma";
import { Prisma, ProviderType, Provider } from "@prisma/client";

export class ProviderTypeServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ProviderTypeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderTypeFindManyArgs>
  ): Promise<number> {
    return this.prisma.providerType.count(args);
  }

  async findMany<T extends Prisma.ProviderTypeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderTypeFindManyArgs>
  ): Promise<ProviderType[]> {
    return this.prisma.providerType.findMany(args);
  }
  async findOne<T extends Prisma.ProviderTypeFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderTypeFindUniqueArgs>
  ): Promise<ProviderType | null> {
    return this.prisma.providerType.findUnique(args);
  }
  async create<T extends Prisma.ProviderTypeCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderTypeCreateArgs>
  ): Promise<ProviderType> {
    return this.prisma.providerType.create<T>(args);
  }
  async update<T extends Prisma.ProviderTypeUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderTypeUpdateArgs>
  ): Promise<ProviderType> {
    return this.prisma.providerType.update<T>(args);
  }
  async delete<T extends Prisma.ProviderTypeDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderTypeDeleteArgs>
  ): Promise<ProviderType> {
    return this.prisma.providerType.delete(args);
  }

  async findProvider(
    parentId: string,
    args: Prisma.ProviderFindManyArgs
  ): Promise<Provider[]> {
    return this.prisma.providerType
      .findUnique({
        where: { id: parentId },
      })
      .provider(args);
  }
}
