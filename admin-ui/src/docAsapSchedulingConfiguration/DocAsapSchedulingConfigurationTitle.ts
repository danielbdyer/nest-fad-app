import { DocAsapSchedulingConfiguration as TDocAsapSchedulingConfiguration } from "../api/docAsapSchedulingConfiguration/DocAsapSchedulingConfiguration";

export const DOCASAPSCHEDULINGCONFIGURATION_TITLE_FIELD = "docAsapId";

export const DocAsapSchedulingConfigurationTitle = (
  record: TDocAsapSchedulingConfiguration
) => {
  return record.docAsapId;
};
