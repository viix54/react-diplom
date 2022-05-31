import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");

  const [loginWrong, setLoginWrong] = useState(true);
  const [passwordWrong, setPasswordWrong] = useState(true);
  const [emailWrong, setEmailWrong] = useState(true);
  const [phoneWrong, setPhoneWrong] = useState(true);
  const [addressWrong, setAddressWrong] = useState(true);

  var nav = useNavigate();

  const handleCheck = () => {
    console.log(loginWrong);
    console.log(passwordWrong);
    console.log(emailWrong);
    console.log(phoneWrong);
    console.log(addressWrong);

    if (
      !loginWrong &&
      !passwordWrong &&
      !emailWrong &&
      !phoneWrong &&
      !addressWrong
    ) {
      console.log("РЕГИСТРАЦИЯ ПРОИСХОДИт ");
      document.getElementById("button").style.backgroundColor = "";
      document.getElementById("button").value = "PASSED";
      registration();
    } else {
      document.getElementById("button").style.backgroundColor = "red";
    }
  };

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "login":
        handleLogin(e);
        break;
      case "password":
        handlePassword(e);
        break;
      case "password_repeat":
        handlePasswordRepeat(e);
        break;
      case "email":
        handleEmail(e);
        break;
      case "phone":
        handlePhone(e);
        break;
      case "address":
        handleAddress(e);
        break;
      default:
    }
  };

  const handleLogin = (e) => {
    let login = e.target.value;
    console.log(login);
    setLogin(login);

    if (login.length < 3 || login.length > 20 || login.split("_")[1] === "") {
      document.getElementById("login").style.color = "red";
      setLoginWrong(true);
    } else {
      document.getElementById("login").style.color = "";
      setLoginWrong(false);
    }
  };
  const handlePassword = (e) => {
    let password = e.target.value;
    setPassword(password);

    if (password.length < 3 || password.length > 15) {
      document.getElementById("password").style.color = "red";
      setPasswordWrong(true);
    } else {
      document.getElementById("password").style.color = "";
      setPasswordWrong(false);
    }
  };
  const handleEmail = (e) => {
    let email = e.target.value;
    setEmail(email);
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      document.getElementById("email").style.color = "red";
      setEmailWrong(true);
    } else {
      document.getElementById("email").style.color = "";
      setEmailWrong(false);
    }
  };
  const handleAddress = (e) => {
    let addr = e.target.value;
    setAddress(addr);

    if (addr.length < 10) {
      document.getElementById("address").style.color = "red";
      setAddressWrong(true);
    } else {
      document.getElementById("address").style.color = "";
      setAddressWrong(false);
    }
  };
  const handlePhone = (e) => {
    let phone = e.target.value;
    let real_phone = phone.slice(1);
    setPhone(real_phone);
    if (real_phone.length !== 12) {
      document.getElementById("phone").style.color = "red";
      setPhoneWrong(true);
    } else {
      document.getElementById("phone").style.color = "";
      setPhoneWrong(false);
    }
  };
  const handlePasswordRepeat = (e) => {
    let password_repeat = e.target.value;
    if (password === password_repeat) {
      setPasswordWrong(false);
      document.getElementById("password_repeat").style.color = "#00bfa5";
    } else {
      document.getElementById("password_repeat").style.color = "red";
      setPasswordWrong(true);
    }
  };

  const registration = () => {
    Axios.post("http://localhost:4000/registr", {
      login: login,
      password: password,
      email: email,
      phone: phone,
      address: address,
    }).then((response) => {
      console.log(response);
      if (response.data.err || response.data.message !== "OK") {
      } else {
        console.log(response.message);
        nav("/login");
      }
    });
  };

  return (
    <div className="row">
      <div className="col s12 " style={{ height: "200px" }}>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              onBlur={(e) => {
                handleBlur(e);
              }}
              onChange={(e) => setLogin(e.target.value)}
              name="login"
              id="login"
              placeholder="Login"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              id="password"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              name="password"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              onBlur={(e) => handleBlur(e)}
              id="password_repeat"
              name="password_repeat"
              placeholder="Repeat Password"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => handleBlur(e)}
              placeholder="Email"
              name="email"
              id="email"
              type="text"
              className="validate"
            />
          </div>
          <div className="input-field col s6">
            <input
              onChange={(e) => {
                setPhone(Number(e.target.value));
              }}
              onBlur={(e) => handleBlur(e)}
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={(e) => setAddress(e.target.value)}
              onBlur={(e) => handleBlur(e)}
              type="text"
              id="address"
              name="address"
              className="validate"
              placeholder="Address"
            />
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <input
              className="btn"
              type="button"
              onClick={() => {
                handleCheck();
              }}
              disabled=""
              id="button"
              value="Register Me"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Registration };
