import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { useRef } from "react";
const Login = () => {
  const password = useRef();
  const username = useRef();
  const { loading, error, dispatch } = useContext(AuthContext);
  const next = () => {
    window.open("/login", "_self");
  };
  const navigate = useNavigate();

  const handleClick = async (e) => {
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://shailesh-reservation-app.herokuapp.com/api/auth/login",
        user
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="loginWrapper">
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <h2>LOGIN</h2>
              <input
                type="text"
                placeholder="username"
                id="Username"
                ref={username}
                className="loginInput"
              />
              <input
                type="password"
                placeholder="password"
                id="Password"
                ref={password}
                className="loginInput"
              />
              <button disabled={loading} type="submit" className="loginButton">
                Login
              </button>
              <button className="loginRegisterButton" onClick={next}>
                Register
              </button>
            </form>
            {error && <span>{error.message}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
