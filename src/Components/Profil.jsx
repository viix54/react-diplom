import { useEffect, useState } from "react";
import axios from "axios";
import { ProfilOneItem } from "./ProfilOneItem";
import { LoginCart } from "./Login_Cart";
import { CartsAdminForOthers } from "./CartsAdmin_ForOthers";
import { CartsUsersForOthers } from "./CartsUsers_ForOthers";
import { useNavigate } from "react-router-dom";

function Profil(props) {
  const nav = useNavigate();
  const [user, setUserProfil] = useState([
    {
      Login: "user",
      Address: "address",
      Phone: "phoneNumber",
      Email: "email",
      Balance: "balance",
    },
  ]);

  const [isDownloaded, setDownloaded] = useState(false);
  const [balanceNew, setBalanceNew] = useState(user[0].Balance);
  const [sumPopolnenia, setSumPopolnenia] = useState(0);
  const [zakaz, setZakaz] = useState([]);

  const [pokupk, setPokupk] = useState([
    {
      ID: "id",
      prodID: "prodID",
      Client: "admin",
      Kolich: "kolich",
      TimeOfOrd: new Date(),
    },
  ]);

  const [pokupkName, setPokupkName] = useState([
    {
      prodN: "prodN",
    },
  ]);

  const dataZakaz = () => {};

  const popolnenie = (sum) => {
    axios
      .post("http://localhost:4000/popolnenie", {
        user: user[0].Login,
        sum: sum,
      })
      .then((result) => {
        setBalanceNew(+balanceNew + +sum);
        document.getElementById("textPopolnenie").value = "";
      });
  };

  useEffect(() => {
    !localStorage.getItem("Status") ? nav("/") : console.log("Authorised");
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4000/profil", {
        login: localStorage.getItem("login"),
      })
      .then((result) => {
        setUserProfil(result.data);
        setBalanceNew(result.data[0].Balance);
        setDownloaded(true);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4000/profilZakaz2", {
        user: localStorage.getItem("login"),
      })
      .then((result) => {
        setZakaz(result.data);
        console.log(result.data);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4000/profilZakaz", {
  //       user: localStorage.getItem("login"),
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setPokupk(data.data);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:4000/profilZakazName", {
  //       id: pokupk[0].prodID,
  //     })
  //     .then((data) => {
  //       // console.log(pokupk[0].prodID);
  //       // setPokupkName(data.data);
  //       console.log(data);
  //     });
  // }, [pokupk]);

  // }, [isDownloaded]);

  return (
    <div>
      <LoginCart />
      {localStorage.getItem("Status") === "Admin" ? (
        <CartsAdminForOthers />
      ) : localStorage.getItem("Status") === "User" ? (
        <CartsUsersForOthers />
      ) : (
        console.log("Unauthorised")
      )}
      <label>
        <h3
          style={{ textAlign: "center", color: "#673ab7", fontWeight: "bold" }}
        >
          Профиль
        </h3>
      </label>
      <table
        style={{
          borderColor: "red",
          borderCollapse: "separate",
          color: "#673ab7",
        }}
      >
        <tbody>
          <tr>
            <td style={{ width: "50%" }}>
              <ul
                className="collection with-header"
                style={{
                  width: "100%",
                  border: "10px solid #ef9a9a",
                  borderRadius: "10px",
                }}
              >
                <li className="collection-header">
                  <h4>
                    <span style={{ fontWeight: "bold" }}>User:</span>{" "}
                    {user[0].Login}
                  </h4>
                </li>
                <li className="collection-item">
                  <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
                  {user[0].Address}
                </li>
                <li className="collection-item">
                  <span style={{ fontWeight: "bold" }}>Phone:</span>{" "}
                  {user[0].PhoneNumber}
                </li>

                <li className="collection-item">
                  <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                  {user[0].Email}
                </li>
                <li className="collection-item">
                  <span style={{ fontWeight: "bold" }}>Balance:</span>{" "}
                  {balanceNew} руб.
                </li>
              </ul>
            </td>
            <div
              style={{
                position: "absolute",
                left: "17%",
                top: "75%",
                verticalAlign: "middle",
              }}
            >
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                Пополнить счет
              </span>{" "}
              <input
                style={{ width: "100px", marginLeft: "5px" }}
                type="text"
                id="textPopolnenie"
                onChange={(e) => {
                  setSumPopolnenia(e.target.value);
                }}
              />
              <button
                onClick={() => popolnenie(sumPopolnenia)}
                className="btn deep-purple"
                style={{ marginLeft: "20px", height: "40px" }}
              >
                Пополнить
              </button>
            </div>
            <td style={{ width: "50%" }}>
              <ul
                className="collection with-header profil-pokupk"
                style={{
                  width: "100%",
                  border: "10px solid #ef9a9a",
                  borderRadius: "10px",
                }}
              >
                <li className="collection-header">
                  <h4 style={{ fontWeight: "bold" }}>Покупки:</h4>
                </li>
                {zakaz.length ? (
                  zakaz.map((order) => (
                    <ProfilOneItem key={order.prodN} {...order} />
                  ))
                ) : (
                  <li className="collection-item">Нет покупок</li>
                )}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { Profil };
