import Farm from "./Farm";
import User from "./User";

export default interface Invitation {
  id: number;
  inviter: User;
  token: string;
  email: string;
  send_date: string;
  accepted: boolean;
  farms: number[] | Farm[];
}
