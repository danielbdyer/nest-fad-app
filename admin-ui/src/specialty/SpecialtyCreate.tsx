import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { ServiceLineTitle } from "../serviceLine/ServiceLineTitle";

export const SpecialtyCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="serviceline.id"
          reference="ServiceLine"
          label="Service Line"
        >
          <SelectInput optionText={ServiceLineTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
