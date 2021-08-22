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

import { INSURANCECARRIER_TITLE_FIELD } from "./InsuranceCarrierTitle";

export const InsuranceCarrierShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Insurance Carrier Code" source="code" />
        <TextField label="Insurance Carrier Name" source="name" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="InsurancePlan"
          target="InsuranceCarrierId"
          label="Insurance Plans"
        >
          <Datagrid rowClick="show">
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <ReferenceField
              label="Insurance Carrier"
              source="insurancecarrier.id"
              reference="InsuranceCarrier"
            >
              <TextField source={INSURANCECARRIER_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Insurance Plan Code" source="code" />
            <TextField label="Insurance Plan Name" source="name" />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
