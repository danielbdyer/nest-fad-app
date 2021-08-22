import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { ServiceLineTitle } from "../serviceLine/ServiceLineTitle";

export const SpecialtyEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput
          source="serviceline.id"
          reference="ServiceLine"
          label="Service Line"
        >
          <SelectInput optionText={ServiceLineTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
