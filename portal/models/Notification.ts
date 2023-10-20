export default interface Notification {
  id: number;
  level: string;
  actor: string;
  unread: boolean;
  verb: string;
  description: string;
  timestamp: string;
}
