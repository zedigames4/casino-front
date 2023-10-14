/// <reference types="node" />
import http from 'http';
import { Server } from 'socket.io';
export declare const io: Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
declare const app: {
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    express: import("express-serve-static-core").Express;
};
export default app;
