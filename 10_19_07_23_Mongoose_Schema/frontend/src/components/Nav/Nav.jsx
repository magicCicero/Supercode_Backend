import "./Nav.css";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <img
                src="https://cdn.icon-icons.com/icons2/1945/PNG/512/iconfinder-blog-4661578_122455.png"
                alt="logo"
                className="nav-logo-img"
              />
            </Link>
          </div>
          <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/authors">Authors</NavLink>
            <NavLink to="/posts">Posts</NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
