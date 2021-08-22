import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import basicHttpAuthProvider from "./auth-provider/ra-auth-basic-http";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { ProviderList } from "./provider/ProviderList";
import { ProviderCreate } from "./provider/ProviderCreate";
import { ProviderEdit } from "./provider/ProviderEdit";
import { ProviderShow } from "./provider/ProviderShow";
import { SpecialtyList } from "./specialty/SpecialtyList";
import { SpecialtyCreate } from "./specialty/SpecialtyCreate";
import { SpecialtyEdit } from "./specialty/SpecialtyEdit";
import { SpecialtyShow } from "./specialty/SpecialtyShow";
import { LocationList } from "./location/LocationList";
import { LocationCreate } from "./location/LocationCreate";
import { LocationEdit } from "./location/LocationEdit";
import { LocationShow } from "./location/LocationShow";
import { ServiceLineList } from "./serviceLine/ServiceLineList";
import { ServiceLineCreate } from "./serviceLine/ServiceLineCreate";
import { ServiceLineEdit } from "./serviceLine/ServiceLineEdit";
import { ServiceLineShow } from "./serviceLine/ServiceLineShow";
import { ConditionList } from "./condition/ConditionList";
import { ConditionCreate } from "./condition/ConditionCreate";
import { ConditionEdit } from "./condition/ConditionEdit";
import { ConditionShow } from "./condition/ConditionShow";
import { LanguageList } from "./language/LanguageList";
import { LanguageCreate } from "./language/LanguageCreate";
import { LanguageEdit } from "./language/LanguageEdit";
import { LanguageShow } from "./language/LanguageShow";
import { MedicalGroupList } from "./medicalGroup/MedicalGroupList";
import { MedicalGroupCreate } from "./medicalGroup/MedicalGroupCreate";
import { MedicalGroupEdit } from "./medicalGroup/MedicalGroupEdit";
import { MedicalGroupShow } from "./medicalGroup/MedicalGroupShow";
import { DocAsapSchedulingConfigurationList } from "./docAsapSchedulingConfiguration/DocAsapSchedulingConfigurationList";
import { DocAsapSchedulingConfigurationCreate } from "./docAsapSchedulingConfiguration/DocAsapSchedulingConfigurationCreate";
import { DocAsapSchedulingConfigurationEdit } from "./docAsapSchedulingConfiguration/DocAsapSchedulingConfigurationEdit";
import { DocAsapSchedulingConfigurationShow } from "./docAsapSchedulingConfiguration/DocAsapSchedulingConfigurationShow";
import { LocationTypeList } from "./locationType/LocationTypeList";
import { LocationTypeCreate } from "./locationType/LocationTypeCreate";
import { LocationTypeEdit } from "./locationType/LocationTypeEdit";
import { LocationTypeShow } from "./locationType/LocationTypeShow";
import { InsuranceCarrierList } from "./insuranceCarrier/InsuranceCarrierList";
import { InsuranceCarrierCreate } from "./insuranceCarrier/InsuranceCarrierCreate";
import { InsuranceCarrierEdit } from "./insuranceCarrier/InsuranceCarrierEdit";
import { InsuranceCarrierShow } from "./insuranceCarrier/InsuranceCarrierShow";
import { InsurancePlanList } from "./insurancePlan/InsurancePlanList";
import { InsurancePlanCreate } from "./insurancePlan/InsurancePlanCreate";
import { InsurancePlanEdit } from "./insurancePlan/InsurancePlanEdit";
import { InsurancePlanShow } from "./insurancePlan/InsurancePlanShow";
import { ProviderTypeList } from "./providerType/ProviderTypeList";
import { ProviderTypeCreate } from "./providerType/ProviderTypeCreate";
import { ProviderTypeEdit } from "./providerType/ProviderTypeEdit";
import { ProviderTypeShow } from "./providerType/ProviderTypeShow";
import { ProviderPhotoList } from "./providerPhoto/ProviderPhotoList";
import { ProviderPhotoCreate } from "./providerPhoto/ProviderPhotoCreate";
import { ProviderPhotoEdit } from "./providerPhoto/ProviderPhotoEdit";
import { ProviderPhotoShow } from "./providerPhoto/ProviderPhotoShow";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"My app"}
        dataProvider={dataProvider}
        authProvider={basicHttpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Provider"
          list={ProviderList}
          edit={ProviderEdit}
          create={ProviderCreate}
          show={ProviderShow}
        />
        <Resource
          name="Specialty"
          list={SpecialtyList}
          edit={SpecialtyEdit}
          create={SpecialtyCreate}
          show={SpecialtyShow}
        />
        <Resource
          name="Location"
          list={LocationList}
          edit={LocationEdit}
          create={LocationCreate}
          show={LocationShow}
        />
        <Resource
          name="ServiceLine"
          list={ServiceLineList}
          edit={ServiceLineEdit}
          create={ServiceLineCreate}
          show={ServiceLineShow}
        />
        <Resource
          name="Condition"
          list={ConditionList}
          edit={ConditionEdit}
          create={ConditionCreate}
          show={ConditionShow}
        />
        <Resource
          name="Language"
          list={LanguageList}
          edit={LanguageEdit}
          create={LanguageCreate}
          show={LanguageShow}
        />
        <Resource
          name="MedicalGroup"
          list={MedicalGroupList}
          edit={MedicalGroupEdit}
          create={MedicalGroupCreate}
          show={MedicalGroupShow}
        />
        <Resource
          name="DocAsapSchedulingConfiguration"
          list={DocAsapSchedulingConfigurationList}
          edit={DocAsapSchedulingConfigurationEdit}
          create={DocAsapSchedulingConfigurationCreate}
          show={DocAsapSchedulingConfigurationShow}
        />
        <Resource
          name="LocationType"
          list={LocationTypeList}
          edit={LocationTypeEdit}
          create={LocationTypeCreate}
          show={LocationTypeShow}
        />
        <Resource
          name="InsuranceCarrier"
          list={InsuranceCarrierList}
          edit={InsuranceCarrierEdit}
          create={InsuranceCarrierCreate}
          show={InsuranceCarrierShow}
        />
        <Resource
          name="InsurancePlan"
          list={InsurancePlanList}
          edit={InsurancePlanEdit}
          create={InsurancePlanCreate}
          show={InsurancePlanShow}
        />
        <Resource
          name="ProviderType"
          list={ProviderTypeList}
          edit={ProviderTypeEdit}
          create={ProviderTypeCreate}
          show={ProviderTypeShow}
        />
        <Resource
          name="ProviderPhoto"
          list={ProviderPhotoList}
          edit={ProviderPhotoEdit}
          create={ProviderPhotoCreate}
          show={ProviderPhotoShow}
        />
      </Admin>
    </div>
  );
};

export default App;
