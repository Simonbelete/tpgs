import Farm from "./Farm";
import User from "./User";

export default interface ExportJob {
  display_name: string;
  id: number;
  file: any;
  farm: number | Farm;
  processing_initiated?: string | null;
  format: string;
  errors: string;
  job_status: string;
  uploaded_on: string;
  created_by: number | User;
  resource: string;
  process_finished?: string | null;
}
