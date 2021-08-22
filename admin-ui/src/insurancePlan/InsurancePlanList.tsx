import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { INSURANCECARRIER_TITLE_FIELD } from "../insuranceCarrier/InsuranceCarrierTitle";

export const InsurancePlanList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Insurance Plans"}
      perPage={50}
      pagination={<Pagination />}
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
    </List>
  );
};
