import React from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration:3000
});

// import background from "../images/hero_background.jpg";
function Landingscreen() {
  return (
    <div class="landing">
      <div class="container-landing mt-7">
        
          <h1 data-aos="zoom-in" class="title-landing h1-landing  mt-7 mb-5">Discover</h1>
          <h2 data-aos="zoom-out" class="subtitle1-landing mb-5">Affordable Rooms</h2>
          <h6 data-aos="zoom-out-left" style={{paddingTop :'0'}} class="subtitle-landing">"Our services are the Best."</h6>
       
        <Link to="/home">
          <button className="btn btn-gradient btn-landing mt-5">Get Started
          <span class="dots"><i class="fas fa-ellipsis-h"></i></span>
          </button>
          
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
