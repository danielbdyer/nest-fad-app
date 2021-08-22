import { Module } from "@nestjs/common";
import { MedicalGroupModuleBase } from "./base/medicalGroup.module.base";
import { MedicalGroupService } from "./medicalGroup.service";
import { MedicalGroupController } from "./medicalGroup.controller";
import { MedicalGroupResolver } from "./medicalGroup.resolver";

@Module({
  imports: [MedicalGroupModuleBase],
  controllers: [MedicalGroupController],
  providers: [MedicalGroupService, MedicalGroupResolver],
  exports: [MedicalGroupService],
})
export class MedicalGroupModule {}
