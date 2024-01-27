import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>home page</h1>
      {/* <CssBaseline /> */}
      <Link to="tutorials">tutorial</Link>
    </div>
  );
};

export default HomePage;
