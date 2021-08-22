import { PrismaService } from "nestjs-prisma";
import { Prisma, ProviderPhoto, Provider } from "@prisma/client";

export class ProviderPhotoServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ProviderPhotoFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderPhotoFindManyArgs>
  ): Promise<number> {
    return this.prisma.providerPhoto.count(args);
  }

  async findMany<T extends Prisma.ProviderPhotoFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderPhotoFindManyArgs>
  ): Promise<ProviderPhoto[]> {
    return this.prisma.providerPhoto.findMany(args);
  }
  async findOne<T extends Prisma.ProviderPhotoFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderPhotoFindUniqueArgs>
  ): Promise<ProviderPhoto | null> {
    return this.prisma.providerPhoto.findUnique(args);
  }
  async create<T extends Prisma.ProviderPhotoCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderPhotoCreateArgs>
  ): Promise<ProviderPhoto> {
    return this.prisma.providerPhoto.create<T>(args);
  }
  async update<T extends Prisma.ProviderPhotoUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderPhotoUpdateArgs>
  ): Promise<ProviderPhoto> {
    return this.prisma.providerPhoto.update<T>(args);
  }
  async delete<T extends Prisma.ProviderPhotoDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderPhotoDeleteArgs>
  ): Promise<ProviderPhoto> {
    return this.prisma.providerPhoto.delete(args);
  }

  async getProvider(parentId: string): Promise<Provider | null> {
    return this.prisma.providerPhoto
      .findUnique({
        where: { id: parentId },
      })
      .provider();
  }
}
