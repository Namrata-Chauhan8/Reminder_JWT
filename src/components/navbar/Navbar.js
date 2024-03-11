import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLoggedIn = userData !== null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          REMINDER APP
        </NavLink>
        <form className="d-flex mr-2">
          
          {!isLoggedIn && (
            <>
            <NavLink to="/" activeClassName="active" className="nav-link">
            <button className="btn btn-outline-success mx-2">Home</button>
          </NavLink>
              <NavLink
                to="/login"
                activeClassName="active"
                className="nav-link"
              >
                <button className="btn btn-outline-success mx-3">Login</button>
              </NavLink>
              <NavLink
                to="/signup"
                activeClassName="active"
                className="nav-link"
              >
                <button className="btn btn-outline-success mx-4 mr-5">
                  Register
                </button>
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <button
              className="btn btn-outline-danger mx-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
