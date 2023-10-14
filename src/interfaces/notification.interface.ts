export enum NotificationType {
  DANGER = 1,
  WARNING,
  COMPLETE,
  MESSAGE,
}

export interface NotificationInterface {
  _id?: string;
  type?: NotificationType;
  time?: Date;
  text: string;
  title?: string;
  action?: (id: string) => void;
}
