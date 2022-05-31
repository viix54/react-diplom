function BasketItem(props) {
  const { id, name, cost, quantity } = props;

  const {
    removeFromBasket = Function.prototype,
    handleQuant,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
  } = props;

  return (
    <li className="collection-item">
      {name} -
      <i
        className="material-icons basket-quantity"
        onClick={() => decQuantity(id)}
      >
        chevron_left
      </i>{" "}
      x {quantity}{" "}
      <i
        className="material-icons basket-quantity"
        onClick={() => incQuantity(id)}
      >
        chevron_right
      </i>{" "}
      = {cost * quantity} руб.
      <span className="secondary-content">
        <i
          className="material-icons basket-delete  "
          onClick={() => removeFromBasket(id)}
        >
          cancel
        </i>
      </span>
    </li>
  );
}

export { BasketItem };
