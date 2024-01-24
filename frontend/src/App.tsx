import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import TutorialsPage from "./pages/TutorialsPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Root />,
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
