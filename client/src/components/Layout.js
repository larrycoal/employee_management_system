import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = (props) => {
  const location = useLocation()
  const [headerText,setHeaderText] = useState("Dashboard")
  useEffect(()=>{
  let newheaderText = location.pathname === "/" ? "Daashboard" : location.pathname === "/employee" ? "Employee Page" : "Retiree Page"
  setHeaderText(newheaderText)
  },[location])
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
          <li>
            <Link to="/retiree">
              <i class="fa-solid fa-business-time"></i> Retiree
            </Link>
          </li>
        </ul>
      </nav>
      <header className="header">
        <h2>{headerText}</h2>
      </header>
      {props.children}
    </div>
  );
};

export default Layout;
