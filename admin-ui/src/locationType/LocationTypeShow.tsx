import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { LOCATIONTYPE_TITLE_FIELD } from "./LocationTypeTitle";

export const LocationTypeShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Location Type Name" source="name" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="Location"
          target="LocationTypeId"
          label="Locations"
        >
          <Datagrid rowClick="show">
            <TextField label="Address Line 1" source="addressLine_1" />
            <TextField label="Address Line 2" source="addressLine_2" />
            <TextField label="City" source="city" />
            <DateField source="createdAt" label="Created At" />
            <TextField label="Friday" source="friday" />
            <TextField label="ID" source="id" />
            <ReferenceField
              label="Location Type"
              source="locationtype.id"
              reference="LocationType"
            >
              <TextField source={LOCATIONTYPE_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Monday" source="monday" />
            <TextField label="Saturday" source="saturday" />
            <TextField label="State" source="state" />
            <TextField label="Sunday" source="sunday" />
            <TextField label="Thursday" source="thursday" />
            <TextField label="Tuesday" source="tuesday" />
            <DateField source="updatedAt" label="Updated At" />
            <TextField label="Wednesday" source="wednesday" />
            <TextField label="ZIP" source="zip" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
