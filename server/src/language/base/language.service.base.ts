import { PrismaService } from "nestjs-prisma";
import { Prisma, Language, Provider } from "@prisma/client";

export class LanguageServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.LanguageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.LanguageFindManyArgs>
  ): Promise<number> {
    return this.prisma.language.count(args);
  }

  async findMany<T extends Prisma.LanguageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.LanguageFindManyArgs>
  ): Promise<Language[]> {
    return this.prisma.language.findMany(args);
  }
  async findOne<T extends Prisma.LanguageFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.LanguageFindUniqueArgs>
  ): Promise<Language | null> {
    return this.prisma.language.findUnique(args);
  }
  async create<T extends Prisma.LanguageCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LanguageCreateArgs>
  ): Promise<Language> {
    return this.prisma.language.create<T>(args);
  }
  async update<T extends Prisma.LanguageUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LanguageUpdateArgs>
  ): Promise<Language> {
    return this.prisma.language.update<T>(args);
  }
  async delete<T extends Prisma.LanguageDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.LanguageDeleteArgs>
  ): Promise<Language> {
    return this.prisma.language.delete(args);
  }

  async findProvider(
    parentId: string,
    args: Prisma.ProviderFindManyArgs
  ): Promise<Provider[]> {
    return this.prisma.language
      .findUnique({
        where: { id: parentId },
      })
      .provider(args);
  }
}
