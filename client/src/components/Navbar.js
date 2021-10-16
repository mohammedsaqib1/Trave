import React from "react";
import imagelogo from "../images/logo.png";
function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  function logout(){
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
  return (
    <div>
      <nav class="navbar header">
        <a class="navbar-brand logo" href="/home">
          <img src={imagelogo} alt="logo" />
        </a>
        <nav class="navbar navbar-expand-lg">
            <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" > <i class="fa fa-bars" style={{color: 'white'}} ></i> </span>
          
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-5">
            {user ? (<>
                <div class="dropdown">
                  <button class="btn btn-gradient dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-user mr-2"></i>{user.name}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="/profile">Profile</a>
                    <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                  </div>
                </div>
              </>) : (<>
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
              </>)}
            </ul>
          </div>
        </nav>
      </nav>
    </div>
  );
}

export default Navbar;
