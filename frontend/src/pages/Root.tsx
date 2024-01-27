import { LoaderFunctionArgs, Outlet, redirect } from "react-router-dom";
import { fakeAuthProvider } from "../auth";
import SideBar from "../components/SideBar";
import AppBarComponent from "../components/AppBar";

const Root = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* left side - the sideBar */}
      <div
        className="sidebar"
        style={{
          width: "200px",
          backgroundColor: "#FAEBD7",
          minWidth: "200px",
        }}
      >
        <SideBar />
      </div>
      {/* right side - all other content */}
      <div
        className="context"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBarComponent />
        <div
          style={{
            height: "15vh",
            backgroundColor: "#4169E1",
            padding: "0 20px",
          }}
        >
          header
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!fakeAuthProvider.isAuthenticated) {
    // let params = new URLSearchParams();
    // params.set("from", new URL(request.url).pathname);
    console.log("not authenticated");
    return redirect("/auth");
  }
  console.log("root loader");
  return null;
};

export default Root;
