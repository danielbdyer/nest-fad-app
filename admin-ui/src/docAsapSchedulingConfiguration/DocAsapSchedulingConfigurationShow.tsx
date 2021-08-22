import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import { PROVIDER_TITLE_FIELD } from "../provider/ProviderTitle";

export const DocAsapSchedulingConfigurationShow = (
  props: ShowProps
): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="DocASAP ID" source="docAsapId" />
        <TextField label="ID" source="id" />
        <ReferenceField
          label="Provider"
          source="provider.id"
          reference="Provider"
        >
          <TextField source={PROVIDER_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
