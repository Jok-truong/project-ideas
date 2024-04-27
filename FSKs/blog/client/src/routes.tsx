import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Outlet />;
      <Toaster />
    </>
  );
};

const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <RegisterPage />,
        path: "/register",
      },
      {
        element: <HomePage />,
        path: "/",
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
