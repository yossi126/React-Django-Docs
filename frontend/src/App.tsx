import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import AuthPage, {
  action as loginAction,
  loader as authLoader,
} from "./pages/AuthPage";
import Root, { loader as rootLoader } from "./pages/Root";
import HomePage from "./pages/HomePage";
import TutorialsPage from "./pages/TutorialsPage";
import "./App.css";
import { lightTheme, darkTheme } from "./theme/themes";
import { useAppSelector } from "./store/store";
import { ThemeProvider } from "@mui/material";
import { fakeAuthProvider } from "./auth";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
    action: loginAction,
    loader: authLoader,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "tutorials",
        element: <TutorialsPage />,
      },
      {
        path: "logout",
        async action() {
          await fakeAuthProvider.signout();
          return redirect("/");
        },
      },
    ],
  },
]);

function App() {
  const { isDarkTheme } = useAppSelector((state) => state.theme);
  return (
    <>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
