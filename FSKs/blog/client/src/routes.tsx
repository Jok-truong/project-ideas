import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comments from "./pages/admin/screens/comments/Comments";
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import Users from "./pages/admin/screens/users/Users";
import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
import EditPost from "./pages/admin/screens/posts/EditPost";
import ProfilePage from "./pages/profile/ProfilePage";

const Layout = () => {
  return (
    <>
      <Outlet />
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
      {
        element: <AdminLayout />,
        path: "admin/",
        children: [
          {
            element: <Admin />,
            index: true,
          },
          {
            element: <Comments />,
            path: "comments",
          },
          {
            element: <ManagePosts />,
            path: "posts/manage",
          },
          {
            element: <EditPost />,
            path: "posts/edit/:slug",
          },
          {
            element: <Categories />,
            path: "categories/manage",
            children: [
              {
                element: <EditCategories />,
                path: "edit/:slug",
              },
            ],
          },
          {
            element: <Users />,
            path: "users/manage",
          },
        ],
      },
      {
        element: <ProfilePage />,
        path: "/profile",
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
