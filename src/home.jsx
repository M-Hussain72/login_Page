import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homePage">
      <div id="nav-bar">
        <div className="nav-bar-logo">
          <p>Hello</p>
        </div>
        <div className="nav-bar-btn">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
