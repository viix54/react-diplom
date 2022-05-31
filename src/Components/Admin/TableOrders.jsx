import { useEffect, useState } from "react";
import axios from "axios";
import { TableOneOrder } from "./TableOneOrder";
import { LoginCart } from "../Login_Cart";
import { CartsAdminForOthers } from "../CartsAdmin_ForOthers";
import { CartsUsersForOthers } from "../CartsUsers_ForOthers";
import { useNavigate } from "react-router-dom";

function TableOrders() {
  const [orders, setOrders] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    !localStorage.getItem("Status") ? nav("/") : console.log("Authorised");
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/tableOrders").then((result) => {
      setOrders(result.data);
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
        <label style={{ fontSize: "30px" }}>Таблица всех заказов</label>
      </div>
      <br />
      <table className="striped highlight centered">
        <thead>
          <tr>
            <th>Product</th>
            <th>User_Login</th>
            <th>Amount</th>
            <th>TimeOfOrder</th>
          </tr>
        </thead>

        <tbody>
          {orders.length ? (
            orders.map((zakaz) => <TableOneOrder key={zakaz.ID} {...zakaz} />)
          ) : (
            <tr style={{ width: "100%" }}>
              <td style={{ width: "20%" }}>Список пуст</td>
              <td style={{ width: "20%" }}>Список пуст</td>
              <td style={{ width: "20%" }}>Список пуст</td>
              <td style={{ width: "20%" }}>Список пуст</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export { TableOrders };
