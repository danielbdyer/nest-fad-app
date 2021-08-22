import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const LanguageEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Language Name" source="name" />
      </SimpleForm>
    </Edit>
  );
};
