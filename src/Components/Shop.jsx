import { useState, useEffect } from "react";
import { Preloader } from "../Components/Preloader";
import { GoodList } from "../Components/GoodList";
import { Cart } from "./Cart";
import { BasketList } from "../Components/BasketList";
import { Alert } from "../Components/Alert";
import axios from "axios";
import { ProfilCart } from "../Components/Profil_cart";
import { AlertBuy } from "../Components/AlertBuy";
import { CardTableUsers } from "./Admin/CartTableUsers";
import { CardTableOrder } from "./Admin/CartTableOrder";
import { AlertNoMoney } from "./AlertNoMoney";
import { RecomCart } from "./Recom_cart";
import { useNavigate } from "react-router-dom";
import { LoginCart } from "./Login_Cart";
import { AdminsCompon } from "./AdminsCompon";
import { UsersComponents } from "./UsersComponents";
import { useParams } from "react-router-dom";

function Shop() {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [goods, setGoods] = useState([]);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState("");
  const [buyFaze, setBuyFaze] = useState(false);
  const [moneyEst, setMoneyEst] = useState(false);
  const [alertNoMoney, setAlertNoMoney] = useState(false);

  const { idrec = "" } = useParams();

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    console.log(order);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
    setAlertName(item.name);
  };

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  const removeFromBasket = (itemId) => {
    const newOrder = order.filter((el) => el.id !== itemId);
    setOrder(newOrder);
  };

  const incQuantity = (itemId) => {
    const newOrder = order.map((el) => {
      if (el.id === itemId) {
        const newQuantity = el.quantity + 1;
        return {
          ...el,
          quantity: newQuantity,
        };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };
  const decQuantity = (itemId) => {
    const newOrder = order.map((el) => {
      if (el.id === itemId) {
        const newQuantity = el.quantity - 1;
        return {
          ...el,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };

  const closeAlert = () => {
    setAlertName("");
  };

  const closeAlertBuy = (data) => {
    console.log(data);
    if (data) {
      setBuyFaze(true);
    } else {
      setBuyFaze(false);
    }
  };
  const closeAlertNoMoney = (data) => {
    console.log(data);
    if (data) {
      setAlertNoMoney(true);
    } else {
      setAlertNoMoney(false);
    }
  };

  useEffect(() => {
    axios.post("http://localhost:4000/goods", {}).then((data) => {
      setGoods(data.data);
      setLoading(false);
      console.log(goods + isLoading);
    });
  }, []);

  return (
    <>
      <LoginCart />
      {localStorage.getItem("Status") === "Admin" ? (
        <AdminsCompon
          quantity={order.length}
          handleBasketShow={handleBasketShow}
        />
      ) : localStorage.getItem("Status") === "User" ? (
        <UsersComponents
          quantity={order.length}
          handleBasketShow={handleBasketShow}
        />
      ) : (
        console.log("Unauthorised")
      )}

      {/* <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      <ProfilCart />
      <RecomCart />
      <CardTableUsers />
      <CardTableOrder /> */}

      {isLoading ? (
        <Preloader />
      ) : (
        <GoodList goods={goods} addToBasket={addToBasket} idrec={idrec} />
      )}
      {isBasketShow && (
        <BasketList
          removeFromBasket={removeFromBasket}
          handleBasketShow={handleBasketShow}
          order={order}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
          closeAlertBuy={closeAlertBuy}
          closeAlertNoMoney={closeAlertNoMoney}
          setOrder={setOrder}
        />
      )}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
      {buyFaze && <AlertBuy closeAlertBuy={closeAlertBuy} />}

      {alertNoMoney && <AlertNoMoney closeAlertNoMoney={closeAlertNoMoney} />}
    </>
  );
}

export { Shop };
