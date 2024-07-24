import { HttpHandler } from "msw";
import { tokenRefreshHandler, userSessionHandler } from "./handlers/user";

export const handlers:HttpHandler[] = [
    userSessionHandler,
    tokenRefreshHandler,
];