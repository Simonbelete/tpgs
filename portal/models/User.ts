import Farm from "./Farm";
import AbstractBaseModel from "./AbstractBaseModel";

export default interface User extends AbstractBaseModel {
  id: number;
  name: string;
  email: string;
  is_superuser: boolean;
  farms: number[] | Farm[];
}
