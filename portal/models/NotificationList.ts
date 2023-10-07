export default interface NotificationList {
  unread_count: number;
  unread_list: Notification[];

  all_count: number; 
  all_list: Notification[];
}