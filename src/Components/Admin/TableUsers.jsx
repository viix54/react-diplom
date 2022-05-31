import { TableOneUser } from "./TableOneUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoginCart } from "../Login_Cart";
import { CartsAdminForOthers } from "../CartsAdmin_ForOthers";
import { CartsUsersForOthers } from "../CartsUsers_ForOthers";
import { useNavigate } from "react-router-dom";
function TableUsers() {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    !localStorage.getItem("Status") ? nav("/") : console.log("Authorised");
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/tableUsers").then((result) => {
      setUsers(result.data);
    });
  }, []);

  return (
    <>
      <LoginCart />
      {localStorage.getItem("Status") === "Admin" ? (
        <CartsAdminForOthers />
      ) : localStorage.getItem("Status") === "User" ? (
        <CartsUsersForOthers />
      ) : (
        console.log("Unauthorised")
      )}
      <div style={{ fontSize: "", textAlign: "center", fontWeight: "bold" }}>
        <label style={{ fontSize: "30px" }}>Таблица всех пользователей</label>
      </div>
      <br />
      <table className="striped highlight centered">
        <thead>
          <tr>
            <th>Login</th>
            <th>Ban Status</th>
            <th>User Status</th>
            <th>Allowed Changes</th>
          </tr>
        </thead>

        <tbody>
          {users.length ? (
            users.map((userOne) => (
              <TableOneUser key={userOne.Login} {...userOne} />
            ))
          ) : (
            <tr style={{ width: "100%" }}>
              <td style={{ width: "25%" }}>Список пуст</td>
              <td style={{ width: "25%" }}>Список пуст</td>
              <td style={{ width: "25%" }}>Список пуст</td>
              <td style={{ width: "25%" }}>Список пуст</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export { TableUsers };
