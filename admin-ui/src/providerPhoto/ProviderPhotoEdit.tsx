import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { ProviderTitle } from "../provider/ProviderTitle";

export const ProviderPhotoEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
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
