import axios from "axios";
import { BasketItem } from "./BasketItem";
import { useState } from "react";

function BasketList(props) {
  const {
    handleBasketShow = Function.prototype,
    order = [],
    removeFromBasket = Function.prototype,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
    closeAlertBuy = Function.prototype,
    setOrder = Function.prototype,
    closeAlertNoMoney = Function.prototype,
  } = props;

  const handleBuy = (sum) => {
    axios
      .post("http://localhost:4000/mon", {
        sum: sum,
        user: localStorage.getItem("login"),
      })
      .then((data) => {
        if (data.data) {
          axios
            .post("http://localhost:4000/addToBd", {
              order: order,
              user: localStorage.getItem("login"),
              sum: sum,
            })
            .then((result) => console.log("Added"));
          setOrder([]);
          handleBasketShow();
          closeAlertBuy(data.data);
        } else {
          closeAlertNoMoney(true);
        }
      });
  };

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.cost * el.quantity;
  }, 0);
  return (
    <ul className="collection basket-list">
      <li className="collection-item active deep-purple">Корзина</li>
      {order.length ? (
        order.map((item) => (
          <BasketItem
            key={item.id}
            {...item}
            removeFromBasket={removeFromBasket}
            incQuantity={incQuantity}
            decQuantity={decQuantity}
          />
        ))
      ) : (
        <li className="collection-item ">Корзина пуста</li>
      )}
      <li className="collection-item active deep-purple">
        Общая стоимость: {totalPrice} руб
      </li>
      <li className="collection-item ">
        <button
          className=" btn-small  deep-purple"
          onClick={() => {
            handleBuy(totalPrice);
          }}
        >
          Оформить
        </button>
      </li>
      <i className="material-icons basket-close" onClick={handleBasketShow}>
        close
      </i>
    </ul>
  );
}
export { BasketList };
