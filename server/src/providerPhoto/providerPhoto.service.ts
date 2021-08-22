import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ProviderPhotoServiceBase } from "./base/providerPhoto.service.base";

@Injectable()
export class ProviderPhotoService extends ProviderPhotoServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
