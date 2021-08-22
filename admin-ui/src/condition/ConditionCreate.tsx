import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { SpecialtyTitle } from "../specialty/SpecialtyTitle";

export const ConditionCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Condition Name" source="name" />
        <ReferenceInput
          source="specialty.id"
          reference="Specialty"
          label="Specialty"
        >
          <SelectInput optionText={SpecialtyTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
