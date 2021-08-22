import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { InsuranceCarrierTitle } from "../insuranceCarrier/InsuranceCarrierTitle";

export const InsurancePlanCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput
          source="insurancecarrier.id"
          reference="InsuranceCarrier"
          label="Insurance Carrier"
        >
          <SelectInput optionText={InsuranceCarrierTitle} />
        </ReferenceInput>
        <TextInput label="Insurance Plan Code" source="code" />
        <TextInput label="Insurance Plan Name" source="name" />
      </SimpleForm>
    </Create>
  );
};
