import Auth from "./components/Auth";
import Courses from "./components/Courses";
import Main from "./components/Main";
import { AUTH_ROUTE, COURSES_ROUTE, MAIN_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: COURSES_ROUTE,
        Component: Courses
    },
    {
        path: MAIN_ROUTE + '/:id',
        Component: Main
    }
]

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]