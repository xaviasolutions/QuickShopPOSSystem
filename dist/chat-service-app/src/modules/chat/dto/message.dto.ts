export class MessageDto {
  sender: string;
  userId?: number;
  roomId?: number;
  content: string;
  room?: string;
  meta?: any;
}
