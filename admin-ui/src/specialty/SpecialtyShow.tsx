import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { SPECIALTY_TITLE_FIELD } from "./SpecialtyTitle";
import { SERVICELINE_TITLE_FIELD } from "../serviceLine/ServiceLineTitle";

export const SpecialtyShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <ReferenceField
          label="Service Line"
          source="serviceline.id"
          reference="ServiceLine"
        >
          <TextField source={SERVICELINE_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="Condition"
          target="SpecialtyId"
          label="Conditions"
        >
          <Datagrid rowClick="show">
            <TextField label="Condition Name" source="name" />
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <ReferenceField
              label="Specialty"
              source="specialty.id"
              reference="Specialty"
            >
              <TextField source={SPECIALTY_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
