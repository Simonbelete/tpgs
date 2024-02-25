import Farm from "./Farm";
import User from "./User";

export default interface ImportJob {
  id: number;
  file: any;
  farm: number | Farm;
  processing_initiated: string;
  format: string;
  errors: string;
  job_status: string;
  uploaded_on: string;
  created_by: number | User;
  resource: string;
  report: stirng;
}
