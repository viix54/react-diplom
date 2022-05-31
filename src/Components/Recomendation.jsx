import { useState, useEffect } from "react";
import { RecomendationItem } from "./RecomendationItem";
import axios from "axios";
import { LoginCart } from "./Login_Cart";
import { CartsAdminForOthers } from "./CartsAdmin_ForOthers";
import { CartsUsersForOthers } from "./CartsUsers_ForOthers";
import { useNavigate } from "react-router-dom";

function Recomendation(props) {
  const [recomGoods, setRecGoods] = useState([]);
  const { addToBasket = Function.prototype } = props;
  const nav = useNavigate();

  useEffect(() => {
    !localStorage.getItem("Status") ? nav("/") : console.log("Authorised");
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4000/recom", {
        user: localStorage.getItem("login"),
      })
      .then((result) => setRecGoods(result.data));
  }, []);

  return (
    <>
      <LoginCart />
      {localStorage.getItem("Status") === "Admin" ? (
        <CartsAdminForOthers />
      ) : localStorage.getItem("Status") === "User" ? (
        <CartsUsersForOthers />
      ) : (
        console.log("Unathorised")
      )}
      <div style={{ fontSize: "", textAlign: "center", fontWeight: "bold" }}>
        <label style={{ fontSize: "30px" }}>Рекомендуемые товары:</label>
      </div>
      <br />
      <div className="goods">
        {recomGoods.length ? (
          recomGoods.map((recom) => (
            <RecomendationItem key={recom.ID} {...recom} />
          ))
        ) : (
          <h4>Nothing found</h4>
        )}
      </div>
    </>
  );
}

export { Recomendation };
