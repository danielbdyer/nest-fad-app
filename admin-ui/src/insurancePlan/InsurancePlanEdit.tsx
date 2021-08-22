import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { InsuranceCarrierTitle } from "../insuranceCarrier/InsuranceCarrierTitle";

export const InsurancePlanEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
