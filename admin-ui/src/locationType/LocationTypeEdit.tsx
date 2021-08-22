import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const LocationTypeEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Location Type Name" source="name" />
      </SimpleForm>
    </Edit>
  );
};
