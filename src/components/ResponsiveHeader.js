import React, { useState } from "react";
import "../assets/styles/header.scss";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function ResponsiveHeader() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const [viewAll, setViewAll] = useState(false);

  let sidebarClass = viewAll ? "sidebar open" : "sidebar";

  const handleDrawerToggle = () => {
    setViewAll((old) => !old);
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
        Kanban
      </div>

      {/*  */}
      <div
        style={{
          pointerEvents: "all",
          //   width:
          //     isMobile && viewAll ? "70%" : !isMobile && viewAll ? "30%" : "",
          width: viewAll ? "15%" : "",
        }}
        className={sidebarClass}
      >
        <div className="sidebar__body">
          <div className="leaderboard__table">
            <div className="result__leaderboard-label">Leaderboard</div>
            Content
          </div>
        </div>
      </div>
    </div>
  );
}
