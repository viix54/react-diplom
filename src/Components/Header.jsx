import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    setLoginStatus(
      localStorage.getItem("Status") ? localStorage.getItem("Status") : ""
    );
  }, []);

  return (
    <nav className="red darken-1">
      <div className="nav-wrapper">
        <Link to="/">
          <img
            style={{
              height: "3rem",
              cursor: "pointer",
              verticalAlign: "middle",
              borderRadius: "10px",
            }}
            src="https://as2.ftcdn.net/v2/jpg/01/98/85/47/500_F_198854745_dhNy3GOnxCZt94evWbzPa2JeJHIvJPmm.jpg"
            alt="logo"
          />
        </Link>
        <Link
          to="/"
          className="brand-logo"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
          }}
        >
          Tuning Shop
        </Link>
        {/* <ul id="nav-mobile" className="right hide-on-med-and-down">
          {loginStatus ? (
            <li>
              <Link to="/login">
                <button class="btn" onClick={() => localStorage.clear()}>
                  Log out
                </button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <button class="btn" onClick={() => localStorage.clear()}>
                  Login
                </button>
              </Link>
            </li>
          )}
        </ul> */}
      </div>
    </nav>
  );
}

export { Header };
