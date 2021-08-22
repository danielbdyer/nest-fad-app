import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { ProviderTitle } from "../provider/ProviderTitle";

export const DocAsapSchedulingConfigurationEdit = (
  props: EditProps
): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
