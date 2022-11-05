import React from "react";
import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <div className="layout">
      <nav className="navbar">
        <h2>EMS</h2>
        <ul>
          <li>
            <Link to="/">
              <i class="fa fa-home" aria-hidden="true"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/employee">
              <i class="fa-solid fa-people-group"></i> Employee
            </Link>
          </li>
        </ul>
      </nav>
      <header className="header">
        <h2>Dashboard</h2>
      </header>
      {props.children}
    </div>
  );
};

export default Layout;
