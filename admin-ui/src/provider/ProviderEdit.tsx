import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  BooleanInput,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";

import { DocAsapSchedulingConfigurationTitle } from "../docAsapSchedulingConfiguration/DocAsapSchedulingConfigurationTitle";
import { ProviderPhotoTitle } from "../providerPhoto/ProviderPhotoTitle";

export const ProviderEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <BooleanInput
          label="Accepting New Patients"
          source="acceptingNewPatients"
        />
        <BooleanInput label="Active" source="active" />
        <TextInput label="Biography" multiline source="biography" />
        <BooleanInput label="Chat Available" source="chatAvailable" />
        <ReferenceInput
          source="docasapschedulingconfiguration.id"
          reference="DocAsapSchedulingConfiguration"
          label="DocASAP Scheduling Configuration"
        >
          <SelectInput optionText={DocAsapSchedulingConfigurationTitle} />
        </ReferenceInput>
        <TextInput label="Email" source="email" type="email" />
        <BooleanInput label="Employed" source="employed" />
        <NumberInput step={1} label="Epic Reference" source="epicReference" />
        <SelectInput
          source="gender"
          label="Gender"
          choices={[{ label: "m", value: "M" }]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
        <BooleanInput label="Online Appointments" source="onlineAppointments" />
        <ReferenceInput
          source="providerphoto.id"
          reference="ProviderPhoto"
          label="Provider Photos"
        >
          <SelectInput optionText={ProviderPhotoTitle} />
        </ReferenceInput>
        <TextInput label="Video URL" source="videoUrl" />
        <BooleanInput label="Virtual Visits" source="virtualVisits" />
        <TextInput label="Website" source="website" />
      </SimpleForm>
    </Edit>
  );
};
