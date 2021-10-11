import React from "react";
import imagelogo from "../images/logo.png";
function Navbar() {
  return (
    <div>
      <nav class="navbar header">
        <a class="navbar-brand logo" href="/">
          <img src={imagelogo} alt="logo" />
        </a>
        <nav class="navbar navbar-expand-lg">
          {/* <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button> */}
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </nav>
    </div>
  );
}

export default Navbar;
