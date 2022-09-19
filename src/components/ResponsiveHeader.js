import React, { useEffect, useState } from "react";
import "../assets/styles/header.scss";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MENU_ITEMS } from "../assets/constants/constants";

export default function ResponsiveHeader() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const [viewSidebar, setViewSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    getCurrentPage();
  }, []);

  const getCurrentPage = () => {
    setCurrentPage(window.location.href.split("/")[3]);
  };

  let sidebarClass = viewSidebar ? "sidebar open" : "sidebar";

  const handleDrawerToggle = () => {
    setViewSidebar((old) => !old);
  };

  const handleRedirect = (route) => {
    navigate(`/${route}`);
  };

  return (
    <div className="header">
      <div className="logoText">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <span onClick={goToHome}>Kanban</span>
      </div>

      {/*  */}
      <div
        style={{
          pointerEvents: "all",
          //   width:
          //     isMobile && viewSidebar ? "70%" : !isMobile && viewSidebar ? "30%" : "",
          width: viewSidebar ? "15%" : "",
        }}
        className={sidebarClass}
      >
        <div className="sidebar__body">
          <div className="leaderboard__table">
            {MENU_ITEMS.map((item) => {
              return (
                <div
                  className={`menu__item ${
                    item === currentPage ? "active" : ""
                  } `}
                  onClick={() => handleRedirect(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
