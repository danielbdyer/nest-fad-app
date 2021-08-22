import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const MedicalGroupCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Medical Group Name" source="name" />
      </SimpleForm>
    </Create>
  );
};
