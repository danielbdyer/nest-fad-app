import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { MedicalGroupServiceBase } from "./base/medicalGroup.service.base";

@Injectable()
export class MedicalGroupService extends MedicalGroupServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
