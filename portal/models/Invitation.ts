import User from "./User";

export default interface Invitation {
  inviter: User;
  token: string;
  email: string;
  send_date: string;
  accepted: boolean;
}
