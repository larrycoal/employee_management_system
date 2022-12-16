import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
const Layout = (props) => {
  const location = useLocation()
  const [showNavbar, setShowNavbar] = useState(false);
  const [headerText,setHeaderText] = useState("Dashboard")
  useEffect(()=>{
  let newheaderText = location.pathname === "/" ? "Daashboard" : location.pathname === "/employee" ? "Employee Page" : "Retiree Page"
  setHeaderText(newheaderText)
  },[location])
  return (
    <div className={showNavbar ? "layout" : "layout_open layout"}>
      <nav
        className="navbar"
        style={{
          display: `${showNavbar ? "none" : "block"}`,
        }}
      >
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
        {showNavbar ? (
          <MenuIcon
            className="hamburger"
            onClick={() => setShowNavbar(!showNavbar)}
          />
        ) : (
          <MenuOpenIcon
            className="hamburger"
            onClick={() => setShowNavbar(!showNavbar)}
          />
        )}
        <h2>{headerText}</h2>
      </header>
      {props.children}
    </div>
  );
};

export default Layout;
