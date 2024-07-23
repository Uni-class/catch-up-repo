import { HttpHandler } from "msw";
import { userSessionHandler } from "./handlers/user";

export const handlers:HttpHandler[] = [userSessionHandler];