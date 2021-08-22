import { PrismaService } from "nestjs-prisma";
import { Prisma, ServiceLine, Location, Specialty } from "@prisma/client";

export class ServiceLineServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ServiceLineFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceLineFindManyArgs>
  ): Promise<number> {
    return this.prisma.serviceLine.count(args);
  }

  async findMany<T extends Prisma.ServiceLineFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceLineFindManyArgs>
  ): Promise<ServiceLine[]> {
    return this.prisma.serviceLine.findMany(args);
  }
  async findOne<T extends Prisma.ServiceLineFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceLineFindUniqueArgs>
  ): Promise<ServiceLine | null> {
    return this.prisma.serviceLine.findUnique(args);
  }
  async create<T extends Prisma.ServiceLineCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceLineCreateArgs>
  ): Promise<ServiceLine> {
    return this.prisma.serviceLine.create<T>(args);
  }
  async update<T extends Prisma.ServiceLineUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceLineUpdateArgs>
  ): Promise<ServiceLine> {
    return this.prisma.serviceLine.update<T>(args);
  }
  async delete<T extends Prisma.ServiceLineDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ServiceLineDeleteArgs>
  ): Promise<ServiceLine> {
    return this.prisma.serviceLine.delete(args);
  }

  async findLocations(
    parentId: string,
    args: Prisma.LocationFindManyArgs
  ): Promise<Location[]> {
    return this.prisma.serviceLine
      .findUnique({
        where: { id: parentId },
      })
      .locations(args);
  }

  async findSpecialties(
    parentId: string,
    args: Prisma.SpecialtyFindManyArgs
  ): Promise<Specialty[]> {
    return this.prisma.serviceLine
      .findUnique({
        where: { id: parentId },
      })
      .specialties(args);
  }
}
