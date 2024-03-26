import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import PostDetail from "./pages/PostDetail.jsx";
import Login from "./pages/login.jsx";
import { AppProvider } from "./context/userContext.jsx";
import { Register } from "./pages/register.jsx";
import { CreatePost } from "./pages/createPost.jsx";
import { UpdatePost } from "./pages/updatePost.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from "./components/navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "post/:postId",
        element: <PostDetail />,
      },
      {
        path: "post/create",
        element: <CreatePost />,
      },
      {
        path: "post/update/:postId",
        element: <UpdatePost />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
