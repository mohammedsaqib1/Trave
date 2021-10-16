import React from "react";
import { Link } from "react-router-dom";

// import background from "../images/hero_background.jpg";
function Landingscreen() {
  return (
    <div class="landing">
      <div class="container-landing">
        <div class="main-heading-landing">
          <h1 class="title-landing h1-landing">Discover</h1>
          <h2 class="subtitle1-landing">Luxury Hotels</h2>
          <h6 class="subtitle-landing">"There is only one boss.The Guest."</h6>
        </div>
        <Link to="/home">
          <button className="btn btn-gradient">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
