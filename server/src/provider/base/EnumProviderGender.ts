import { registerEnumType } from "@nestjs/graphql";

export enum EnumProviderGender {
  M = "M",
}

registerEnumType(EnumProviderGender, {
  name: "EnumProviderGender",
});
