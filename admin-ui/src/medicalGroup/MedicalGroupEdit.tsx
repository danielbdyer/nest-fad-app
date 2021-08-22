import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const MedicalGroupEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Medical Group Name" source="name" />
      </SimpleForm>
    </Edit>
  );
};
