import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { ProviderTitle } from "../provider/ProviderTitle";

export const DocAsapSchedulingConfigurationCreate = (
  props: CreateProps
): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="DocASAP ID" source="docAsapId" />
        <ReferenceInput
          source="provider.id"
          reference="Provider"
          label="Provider"
        >
          <SelectInput optionText={ProviderTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
