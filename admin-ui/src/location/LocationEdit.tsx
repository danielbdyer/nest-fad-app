import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { LocationTypeTitle } from "../locationType/LocationTypeTitle";

export const LocationEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Address Line 1" source="addressLine_1" />
        <TextInput label="Address Line 2" source="addressLine_2" />
        <TextInput label="City" source="city" />
        <DateTimeInput label="Friday" source="friday" />
        <ReferenceInput
          source="locationtype.id"
          reference="LocationType"
          label="Location Type"
        >
          <SelectInput optionText={LocationTypeTitle} />
        </ReferenceInput>
        <DateTimeInput label="Monday" source="monday" />
        <DateTimeInput label="Saturday" source="saturday" />
        <TextInput label="State" source="state" />
        <DateTimeInput label="Sunday" source="sunday" />
        <DateTimeInput label="Thursday" source="thursday" />
        <DateTimeInput label="Tuesday" source="tuesday" />
        <DateTimeInput label="Wednesday" source="wednesday" />
        <TextInput label="ZIP" source="zip" />
      </SimpleForm>
    </Edit>
  );
};
