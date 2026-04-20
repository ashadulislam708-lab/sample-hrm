export interface NotificationItem {
  id: string;
  title: string;
  body: string | null;
  read: boolean;
  createdAt: string;
  link: string | null;
}

export interface NotificationState {
  list: NotificationItem[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}
