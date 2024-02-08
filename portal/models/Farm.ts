import AbstractBaseModel from "./AbstractBaseModel";
import City from "./City";
import Country from "./Country";

export default interface Farm extends AbstractBaseModel {
  id: number;
  name: string;
  display_name: string;
  tenant_name: string;
  tenant_uuid: string;
  email?: string;
  phone_number?: string;
  address?: string;
  country?: Country | null;
  city?: City | null;
}
