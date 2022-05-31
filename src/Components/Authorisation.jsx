import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Authorisation() {
  const nav = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [loginError, setLoginError] = useState("Поле должно быть заполнено");
  const [passwordError, setPasswordError] = useState(
    "Поле должно быть заполнено"
  );
  const [formValid, setFormValid] = useState(false);

  const loginHandler = (e) => {
    setUsername(e.target.value);

    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setLoginError("Логин должен быть длиннее 3 символов и меньше 20");
      if (!e.target.value) {
        setLoginError("Поле должно быть заполнено");
      }
    } else {
      setLoginError();
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError("Пароль должен быть длиннее 3 и меньше 8");
      if (!e.target.value) {
        setPasswordError("Поле должно быть заполнено");
      }
    } else {
      setPasswordError();
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "login":
        setLoginDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
    }
  };

  const login = () => {
    Axios.post("http://localhost:4000/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        console.log(response.data.Login);
        console.log(response.data.Password);
        if (response.data[0].Banned)
          setLoginStatus("Sorry,but you were banned!");
        else {
          localStorage.setItem("login", response.data[0].Login);
          localStorage.setItem("password", response.data[0].Password);
          localStorage.setItem("Banned", response.data[0].Banned);
          localStorage.setItem(
            "Status",
            response.data[0].Status_ID === 1 ? "Admin" : "User"
          );
          setLoginStatus("Ok");
          nav("/");
        }

        // console.log(loginStatus);
      }
    });
  };

  useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, passwordError]);

  return (
    <div>
      <div
        className="row"
        style={{
          position: "absolute",
          top: "47%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <div
          className="col s12 deep-purple"
          style={{
            width: "500px",
            textAlign: "center",
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: "red",
            backgroundColor: "#0097a7 ",
            borderRadius: "10px",
          }}
        >
          <br />
          <label for="first_name" style={{ fontSize: "25px", color: "white" }}>
            Логин
          </label>
          {loginDirty && loginError && (
            <p style={{ color: "#ef9a9a" }}>{loginError}</p>
          )}
          <div className="input-field col s12 ">
            <input
              onBlur={(e) => {
                blurHandler(e);
              }}
              id="first_name"
              name="login"
              type="text"
              className="validate "
              onChange={loginHandler}
              style={{ color: "white", textAlign: "center" }}
            />
          </div>

          <div className="row">
            <label
              for="first_name"
              style={{ fontSize: "25px", color: "white" }}
            >
              Пароль
            </label>
            {passwordDirty && passwordError && (
              <p style={{ color: "#ef9a9a" }}>{passwordError}</p>
            )}
            <div className="input-field col s12">
              <input
                onBlur={(e) => {
                  blurHandler(e);
                }}
                id="password"
                type="password"
                name="password"
                className="validate"
                onChange={passwordHandler}
                style={{
                  color: "white",

                  textAlign: "center",
                }}
              />
            </div>
          </div>

          <div className="row">
            <button
              disabled={!formValid}
              className="btn deep-purple lighten-2"
              onClick={login}
            >
              Log in
            </button>
          </div>
          {loginStatus !== "Ok" && loginStatus !== "" ? (
            <p style={{ color: "#ef9a9a " }}>{loginStatus}</p>
          ) : null}
          <div className="row" style={{ color: "white" }}>
            Если вы еще не зарегистрированы, это можно сделать, перейдя на
            страницу{" "}
            <Link to="/registr" style={{ color: "#ef9a9a" }}>
              регистрации
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  // const [usernameReg, setUsernameReg] = useState("");
  // const [passwordReg, setPasswordReg] = useState("");
  // const [emailReg, setEmailReg] = useState("");
  // const [phoneNumberReg, setPhoneNumberReg] = useState("");
  // const [addressReg, setAddressReg] = useState("");

  // const register = () => {
  //   Axios.post("http://localhost:4000/register", {
  //     username: usernameReg,
  //     password: passwordReg,
  //     email: emailReg,
  //     phoneNumber: phoneNumberReg,
  //     address: addressReg,
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  // return (
  //   <div classNameNameName="App">
  //     <div classNameNameName="registration">
  //       <h1>Registration</h1>
  //       <label>Username</label>
  //       <input
  //         type="text"
  //         onChange={(e) => {
  //           setUsernameReg(e.target.value);
  //         }}
  //       />
  //       <label>Password</label>
  //       <input
  //         type="text"
  //         onChange={(e) => {
  //           setPasswordReg(e.target.value);
  //         }}
  //       />
  //       <label>Email</label>
  //       <input
  //         type="text"
  //         onChange={(e) => {
  //           setEmailReg(e.target.value);
  //         }}
  //       />
  //       <label>PhoneNumber</label>
  //       <input
  //         type="text"
  //         onChange={(e) => {
  //           setPhoneNumberReg(e.target.value);
  //         }}
  //       />
  //       <label>Address</label>
  //       <input
  //         type="text"
  //         onChange={(e) => {
  //           setAddressReg(e.target.value);
  //         }}
  //       />
  //       <button onClick={register}>Register</button>
  //     </div>

  //     <div classNameNameName="login">
  //       <h1>Login</h1>
  //       <input
  //         type="text"
  //         placeholder="Username..."
  //         onChange={(e) => {
  //           setUsername(e.target.value);
  //         }}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password..."
  //         onChange={(e) => {
  //           setPassword(e.target.value);
  //         }}
  //       />
  //       <button onClick={login}>Login</button>
  //     </div>
  //     <h1>{loginStatus}</h1>
  //   </div>
  // );
}

export { Authorisation };
