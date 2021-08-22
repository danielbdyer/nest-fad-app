import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  BooleanField,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";

import { DOCASAPSCHEDULINGCONFIGURATION_TITLE_FIELD } from "../docAsapSchedulingConfiguration/DocAsapSchedulingConfigurationTitle";
import { PROVIDERPHOTO_TITLE_FIELD } from "../providerPhoto/ProviderPhotoTitle";

export const ProviderShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <BooleanField
          label="Accepting New Patients"
          source="acceptingNewPatients"
        />
        <BooleanField label="Active" source="active" />
        <TextField label="Biography" source="biography" />
        <BooleanField label="Chat Available" source="chatAvailable" />
        <DateField source="createdAt" label="Created At" />
        <ReferenceField
          label="DocASAP Scheduling Configuration"
          source="docasapschedulingconfiguration.id"
          reference="DocAsapSchedulingConfiguration"
        >
          <TextField source={DOCASAPSCHEDULINGCONFIGURATION_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Email" source="email" />
        <BooleanField label="Employed" source="employed" />
        <TextField label="Epic Reference" source="epicReference" />
        <TextField label="Gender" source="gender" />
        <TextField label="ID" source="id" />
        <BooleanField label="Online Appointments" source="onlineAppointments" />
        <ReferenceField
          label="Provider Photos"
          source="providerphoto.id"
          reference="ProviderPhoto"
        >
          <TextField source={PROVIDERPHOTO_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="Video URL" source="videoUrl" />
        <BooleanField label="Virtual Visits" source="virtualVisits" />
        <TextField label="Website" source="website" />
      </SimpleShowLayout>
    </Show>
  );
};
