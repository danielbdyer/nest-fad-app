import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { SpecialtyTitle } from "../specialty/SpecialtyTitle";

export const ConditionEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
