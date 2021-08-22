import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  DocAsapSchedulingConfiguration,
  Provider,
} from "@prisma/client";

export class DocAsapSchedulingConfigurationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.DocAsapSchedulingConfigurationFindManyArgs>(
    args: Prisma.SelectSubset<
      T,
      Prisma.DocAsapSchedulingConfigurationFindManyArgs
    >
  ): Promise<number> {
    return this.prisma.docAsapSchedulingConfiguration.count(args);
  }

  async findMany<T extends Prisma.DocAsapSchedulingConfigurationFindManyArgs>(
    args: Prisma.SelectSubset<
      T,
      Prisma.DocAsapSchedulingConfigurationFindManyArgs
    >
  ): Promise<DocAsapSchedulingConfiguration[]> {
    return this.prisma.docAsapSchedulingConfiguration.findMany(args);
  }
  async findOne<T extends Prisma.DocAsapSchedulingConfigurationFindUniqueArgs>(
    args: Prisma.SelectSubset<
      T,
      Prisma.DocAsapSchedulingConfigurationFindUniqueArgs
    >
  ): Promise<DocAsapSchedulingConfiguration | null> {
    return this.prisma.docAsapSchedulingConfiguration.findUnique(args);
  }
  async create<T extends Prisma.DocAsapSchedulingConfigurationCreateArgs>(
    args: Prisma.SelectSubset<
      T,
      Prisma.DocAsapSchedulingConfigurationCreateArgs
    >
  ): Promise<DocAsapSchedulingConfiguration> {
    return this.prisma.docAsapSchedulingConfiguration.create<T>(args);
  }
  async update<T extends Prisma.DocAsapSchedulingConfigurationUpdateArgs>(
    args: Prisma.SelectSubset<
      T,
      Prisma.DocAsapSchedulingConfigurationUpdateArgs
    >
  ): Promise<DocAsapSchedulingConfiguration> {
    return this.prisma.docAsapSchedulingConfiguration.update<T>(args);
  }
  async delete<T extends Prisma.DocAsapSchedulingConfigurationDeleteArgs>(
    args: Prisma.SelectSubset<
      T,
      Prisma.DocAsapSchedulingConfigurationDeleteArgs
    >
  ): Promise<DocAsapSchedulingConfiguration> {
    return this.prisma.docAsapSchedulingConfiguration.delete(args);
  }

  async getProvider(parentId: string): Promise<Provider | null> {
    return this.prisma.docAsapSchedulingConfiguration
      .findUnique({
        where: { id: parentId },
      })
      .provider();
  }
}
