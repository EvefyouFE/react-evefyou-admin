import { RouteObject, createBrowserRouter } from "react-router-dom";
import { crRoutes } from "./crRoutes";

export { crRoutes as routes } from './crRoutes';
export * from './routeHelper';


export const router = createBrowserRouter(crRoutes as RouteObject[], {
    basename: import.meta.env.VITE_PUBLIC_PATH
});