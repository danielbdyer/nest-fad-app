import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { LocationTypeServiceBase } from "./base/locationType.service.base";

@Injectable()
export class LocationTypeService extends LocationTypeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
