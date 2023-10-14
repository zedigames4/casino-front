import { Server } from 'socket.io';
declare const authSocketMiddleware: (io: Server) => void;
export default authSocketMiddleware;
