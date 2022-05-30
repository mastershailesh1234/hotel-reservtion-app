import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router";
import Navbar from "../../components/navbar/Navbar";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const phone = useRef();
  const country = useRef();
  const city = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();
  const next = () => {
    window.open("/login", "_self");
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        phone: phone.current.value,
        city: city.current.value,
        country: country.current.value,
      };
      console.log(user);
      try {
        await axios.post(
          "https://shailesh-reservation-app.herokuapp.com/api/auth/register",
          user
        );
        window.open("/login", "_self");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login">
        <div className="loginWrapper">
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <h2>REGISTER</h2>
              <input
                placeholder="Username"
                required
                ref={username}
                className="loginInput"
              />
              <input
                placeholder="Email"
                required
                ref={email}
                className="loginInput"
                type="email"
              />
              <input
                placeholder="Country"
                required
                ref={country}
                className="loginInput"
              />
              <input
                placeholder="City"
                required
                ref={city}
                className="loginInput"
              />
              <input
                placeholder="Phone No."
                required
                ref={phone}
                className="loginInput"
                minLength="10"
              />
              <input
                placeholder="Password"
                required
                ref={password}
                className="loginInput"
                type="password"
                minLength="6"
              />
              <input
                placeholder="Password Again"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
              />
              <button className="loginButton" type="submit">
                Sign Up
              </button>
              <button className="loginRegisterButton" onClick={next}>
                Log into Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
