import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ProviderModule } from "./provider/provider.module";
import { SpecialtyModule } from "./specialty/specialty.module";
import { LocationModule } from "./location/location.module";
import { ServiceLineModule } from "./serviceLine/serviceLine.module";
import { ConditionModule } from "./condition/condition.module";
import { LanguageModule } from "./language/language.module";
import { MedicalGroupModule } from "./medicalGroup/medicalGroup.module";
import { DocAsapSchedulingConfigurationModule } from "./docAsapSchedulingConfiguration/docAsapSchedulingConfiguration.module";
import { LocationTypeModule } from "./locationType/locationType.module";
import { InsuranceCarrierModule } from "./insuranceCarrier/insuranceCarrier.module";
import { InsurancePlanModule } from "./insurancePlan/insurancePlan.module";
import { ProviderTypeModule } from "./providerType/providerType.module";
import { ProviderPhotoModule } from "./providerPhoto/providerPhoto.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    ProviderModule,
    SpecialtyModule,
    LocationModule,
    ServiceLineModule,
    ConditionModule,
    LanguageModule,
    MedicalGroupModule,
    DocAsapSchedulingConfigurationModule,
    LocationTypeModule,
    InsuranceCarrierModule,
    InsurancePlanModule,
    ProviderTypeModule,
    ProviderPhotoModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
