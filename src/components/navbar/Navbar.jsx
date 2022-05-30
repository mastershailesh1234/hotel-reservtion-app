import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("user");
    window.open("/", "_self");
  };
  const login = () => {
    navigate("/login");
  };
  const register = () => {
    navigate("/register");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "gold", textDecoration: "none" }}>
          <span className="logo">Booking.com</span>
        </Link>
        {user ? (
          <div>
            {user.username}
            <button className="logout" onClick={logout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={register}>
              Register
            </button>
            <button className="navButton" onClick={login}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
