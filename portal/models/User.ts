import Farm from "./Farm";
import Group from "./Group";
import AbstractBaseModel from "./AbstractBaseModel";
import Country from "./Country";

export default interface User extends AbstractBaseModel {
  id: number;
  name: string;
  email: string;
  is_superuser: boolean;
  farms: number[] | Farm[];
  groups: number[] | Group[];
  country?: number | null | Country;
  company?: null | string;
}
