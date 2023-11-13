import AbstractBaseModel from "./AbstractBaseModel";

export default interface Farm extends AbstractBaseModel {
  id: number;
  name: string;
  display_name: string;
  tenant_name: string;
  tenant_uuid: string;
}
