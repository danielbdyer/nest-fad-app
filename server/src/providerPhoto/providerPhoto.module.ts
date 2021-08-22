import { Module } from "@nestjs/common";
import { ProviderPhotoModuleBase } from "./base/providerPhoto.module.base";
import { ProviderPhotoService } from "./providerPhoto.service";
import { ProviderPhotoController } from "./providerPhoto.controller";
import { ProviderPhotoResolver } from "./providerPhoto.resolver";

@Module({
  imports: [ProviderPhotoModuleBase],
  controllers: [ProviderPhotoController],
  providers: [ProviderPhotoService, ProviderPhotoResolver],
  exports: [ProviderPhotoService],
})
export class ProviderPhotoModule {}
