import User from "./User";

export default interface AbstractBaseModel {
  id: number;
  display_name: string;
  is_active: boolean;
  created_at: string;
  created_by: number | null | User;
}
