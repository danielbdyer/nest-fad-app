import { PrismaService } from "nestjs-prisma";
import { Prisma, LocationType, Location } from "@prisma/client";

export class LocationTypeServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.LocationTypeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.LocationTypeFindManyArgs>
  ): Promise<number> {
    return this.prisma.locationType.count(args);
  }

  async findMany<T extends Prisma.LocationTypeFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.LocationTypeFindManyArgs>
  ): Promise<LocationType[]> {
    return this.prisma.locationType.findMany(args);
  }
  async findOne<T extends Prisma.LocationTypeFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.LocationTypeFindUniqueArgs>
  ): Promise<LocationType | null> {
    return this.prisma.locationType.findUnique(args);
  }
  async create<T extends Prisma.LocationTypeCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LocationTypeCreateArgs>
  ): Promise<LocationType> {
    return this.prisma.locationType.create<T>(args);
  }
  async update<T extends Prisma.LocationTypeUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LocationTypeUpdateArgs>
  ): Promise<LocationType> {
    return this.prisma.locationType.update<T>(args);
  }
  async delete<T extends Prisma.LocationTypeDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.LocationTypeDeleteArgs>
  ): Promise<LocationType> {
    return this.prisma.locationType.delete(args);
  }

  async findLocations(
    parentId: string,
    args: Prisma.LocationFindManyArgs
  ): Promise<Location[]> {
    return this.prisma.locationType
      .findUnique({
        where: { id: parentId },
      })
      .locations(args);
  }
}
