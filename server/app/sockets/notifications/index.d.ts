import { Server } from 'socket.io';
import { SocketWithUser } from '../../interfaces/socket.interface';
declare const ioNotifications: (io: Server, socket: SocketWithUser) => void;
export default ioNotifications;
