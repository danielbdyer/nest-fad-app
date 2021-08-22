import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const LanguageCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Language Name" source="name" />
      </SimpleForm>
    </Create>
  );
};
