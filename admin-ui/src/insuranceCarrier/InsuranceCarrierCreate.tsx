import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const InsuranceCarrierCreate = (
  props: CreateProps
): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Insurance Carrier Code" source="code" />
        <TextInput label="Insurance Carrier Name" source="name" />
      </SimpleForm>
    </Create>
  );
};
