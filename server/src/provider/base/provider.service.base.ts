import { PrismaService } from "nestjs-prisma";

import {
  Prisma,
  Provider,
  Condition,
  InsuranceCarrier,
  InsurancePlan,
  Language,
  Location,
  MedicalGroup,
  ProviderType,
  Specialty,
  DocAsapSchedulingConfiguration,
  ProviderPhoto,
} from "@prisma/client";

export class ProviderServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ProviderFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderFindManyArgs>
  ): Promise<number> {
    return this.prisma.provider.count(args);
  }

  async findMany<T extends Prisma.ProviderFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderFindManyArgs>
  ): Promise<Provider[]> {
    return this.prisma.provider.findMany(args);
  }
  async findOne<T extends Prisma.ProviderFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderFindUniqueArgs>
  ): Promise<Provider | null> {
    return this.prisma.provider.findUnique(args);
  }
  async create<T extends Prisma.ProviderCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderCreateArgs>
  ): Promise<Provider> {
    return this.prisma.provider.create<T>(args);
  }
  async update<T extends Prisma.ProviderUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderUpdateArgs>
  ): Promise<Provider> {
    return this.prisma.provider.update<T>(args);
  }
  async delete<T extends Prisma.ProviderDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProviderDeleteArgs>
  ): Promise<Provider> {
    return this.prisma.provider.delete(args);
  }

  async findConditions(
    parentId: string,
    args: Prisma.ConditionFindManyArgs
  ): Promise<Condition[]> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .conditions(args);
  }

  async findInsuranceCarriers(
    parentId: string,
    args: Prisma.InsuranceCarrierFindManyArgs
  ): Promise<InsuranceCarrier[]> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .insuranceCarriers(args);
  }

  async findInsurancePlans(
    parentId: string,
    args: Prisma.InsurancePlanFindManyArgs
  ): Promise<InsurancePlan[]> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .insurancePlans(args);
  }

  async findLanguages(
    parentId: string,
    args: Prisma.LanguageFindManyArgs
  ): Promise<Language[]> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .languages(args);
  }

  async findLocations(
    parentId: string,
    args: Prisma.LocationFindManyArgs
  ): Promise<Location[]> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .locations(args);
  }

  async findMedicalGroups(
    parentId: string,
    args: Prisma.MedicalGroupFindManyArgs
  ): Promise<MedicalGroup[]> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .medicalGroups(args);
  }

  async findProviderTypes(
    parentId: string,
    args: Prisma.ProviderTypeFindManyArgs
  ): Promise<ProviderType[]> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .providerTypes(args);
  }

  async findSpecialty(
    parentId: string,
    args: Prisma.SpecialtyFindManyArgs
  ): Promise<Specialty[]> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .specialty(args);
  }

  async getDocAsapSchedulingConfiguration(
    parentId: string
  ): Promise<DocAsapSchedulingConfiguration | null> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .docAsapSchedulingConfiguration();
  }

  async getProviderPhotos(parentId: string): Promise<ProviderPhoto | null> {
    return this.prisma.provider
      .findUnique({
        where: { id: parentId },
      })
      .providerPhotos();
  }
}
