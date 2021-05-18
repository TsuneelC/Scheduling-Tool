import React from "react";
import logo from "../../../images/gmrLogo.png";
import users from "../../../images/users.svg";
import resultsIcon from "../../../images/resultsIcon.svg";
import analyticsIcon from "../../../images/analyticsIcon.svg";
import logoutIcon from "../../../images/logoutIcon.svg";
import { eraseCookie } from "../../../utils/cookies";
import "./style.scss";

function Navbar() {

  const logout = () =>  {
    try {  
      const cookies = document.cookie;
      const multiple = cookies.split(";");
            for(var i = 0; i < multiple.length; i++) {
               var key = multiple[i].split("=");
               eraseCookie(key);
            } 
      window.location.href = window.location.origin;
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <nav
      className="mainLogo is-fixed-top is-transparent is-centered main-app d-flex"
      role="navigation"
      aria-label="main navigation"
    >
     
      <div className="navbar-brand">
        {/* PHASE 2 <img src={helpIcon} width="33px" height="33px"/> */}

        <div className="navbar-item has-dropdown is-hoverable width-auto">
          <a
            role="button"
            className="navbar-item navbar-burger burger  width-auto"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

          <aside className="menu navbar-dropdown">
            <ul className="menu-list">
              <div className="columns px-2 pt-5">
                <div className="column is-paddingless">
                  <li className="navbar-listed-item ">
                    <a
                      className="d-flex flex-col just-center align-center text-center"
                      // onClick={() => history.push("/details")}
                    >
                      <div className="icon">
                        <img src={resultsIcon} width="33px" height="33px" />
                      </div>
                      <div className="text">
                        <text>Vaccine Administration</text>
                      </div>
                    </a>
                  </li>
                  <li className="navbar-listed-item ">
                    <a
                      className="d-flex flex-col just-center align-center text-center"
                      // onClick={() => goToDash(true)}
                    >
                      <div className="icon">
                        <img src={analyticsIcon} width="33px" height="33px" />
                      </div>
                      <div className="text">
                        <text>Analytics</text>
                      </div>
                    </a>
                  </li>
                </div>
                <div className="column is-paddingless">
                  <li className="navbar-listed-item ">
                    <a
                      className="d-flex flex-col just-center align-center text-center disabled"
                      onClick={() => logout()}
                    >
                      <div className="icon">
                        <img src={logoutIcon} width="33px" height="33px" />
                      </div>
                      <div className="text">
                        <text>Logout</text>
                      </div>
                    </a>
                  </li>
                  {/* {user !== null && user.isSuperTestingAdmin && isTestingAdmin && ( */}
                  <li className="navbar-listed-item ">
                    <a
                      className="d-flex flex-col just-center align-center text-center"
                      // onClick={() =>
                      //   setIsInventoryModalOpen(!isInventoryModalOpen)
                      // }
                    >
                      <div className="icon">
                        <img src={users} width="33px" height="33px" />
                      </div>
                      <div className="text">
                        <text>
                          User Management
                          {/* {screeningType === "vaccinations"
                              ? "Vaccinations Inventory"
                              : "Inventory"} */}
                        </text>
                      </div>
                    </a>
                  </li>
                  {/* )} */}
                </div>
              </div>
            </ul>
          </aside>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <img src={logo} className="header-logo" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
