import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/ErrorPage";

const Layout = () => {
  return <Outlet />;
};

const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
