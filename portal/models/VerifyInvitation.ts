import User from "./User";

export default interface VerifyInvitation extends Partial<User> {
  token: string;
  password: string;
  name: string;
}
