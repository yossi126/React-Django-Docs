import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage, {
  action as loginAction,
  loader as authLoader,
} from "./pages/AuthPage";
import Root, { loader as rootLoader } from "./pages/Root";
import HomePage from "./pages/HomePage";
import TutorialsPage from "./pages/TutorialsPage";
import "./App.css";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
