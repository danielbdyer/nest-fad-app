import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { SpecialtyServiceBase } from "./base/specialty.service.base";

@Injectable()
export class SpecialtyService extends SpecialtyServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
