import User from './User';

export default interface AbstractSummary {
  id: number;
  created_by: User,
  created_at: string,
  last_updated_by: User;
  last_updated_at: string;
  last_history_id: number;
  last_history_type: string;
  history_count: number;

}