import Auth from "./components/Auth";
import Main from "./components/Main";
import { AUTH_ROUTE, MAIN_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]