import User from "./User";

export default interface History {
  history_id: number;
  history_user: User;
  history_date: string;
  history_type: string;
  history_change_reason?: string;
}
