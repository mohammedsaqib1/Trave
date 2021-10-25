import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FacebookLoginButton } from "react-social-login-buttons";
import { InstagramLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function Login() {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const result = (await axios.post("/api/users/login", user)).data;
      setloading(false);

      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }
  return (
    <div className="landing-login-reg" style={{}}>
      {loading && <Loader />}
      {/* <div className="row justify-content-center "> */}
      <div className="col-md-12 log input-reg-log">
        {error && <Error message="Invalid Credintials" />}
        <div className="boxshadow" style={{ backgroundColor: "white" }}>
          <h2 className="h2-register">Login</h2>

          <input
            style={{ fontSize: "1.6rem"}}
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            style={{ fontSize: "1.6rem" }}
            type="password"
            className="form-control mt-3 mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button className="btn btn-lg btn-gradient mt-4 form-control justify-content-center" style={{fontSize:'20px' , marginBottom:'20px'}} onClick={Login}>
            Login
          </button>
            <h3 className="mt-2 mb-5">or</h3>
          <div class="row mt-10">
            <div className="col-md-6">
              <FacebookLoginButton
                style={{ borderRadius: "5px", alignItems: "center" , paddingTop:'0' , paddingRight:'0' }}
                onClick={() => alert("Hello")}
              >
                <span>Facebook</span>
              </FacebookLoginButton>
              </div>
              <div className="col-md-6">
              <InstagramLoginButton
                style={{ borderRadius: "5px", alignItems: "center" , paddingTop:'0' }}
                onClick={() => alert("Hello")}
              >
                <span>Instagram</span>
              </InstagramLoginButton>
            </div>
            <div className="col-md-6">
              <GoogleLoginButton
                style={{ borderRadius: "5px", alignItems: "center" , paddingTop:'0' }}
                onClick={() => alert("Hello")}
              >
                <span>Google</span>
              </GoogleLoginButton>
            </div>
            <div className="col-md-6">
              <GithubLoginButton
                style={{ borderRadius: "5px", alignItems: "center" , paddingTop:'0' }}
                onClick={() => alert("Hello")}
              >
                <span>Github</span>
              </GithubLoginButton>
            </div>
          </div>
          <div className="mt-4">
            <p class="login-text">Don't have an account?<a href="/register" class="register"> Register now</a> </p>
        </div>
        </div>
      </div>
      {/* </div>  */}
    </div>
  );
}

export default Loginscreen;
