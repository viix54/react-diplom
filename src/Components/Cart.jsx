function Cart(props) {
  const { quantity = 0, handleBasketShow = Function.prototype } = props;

  return (
    <div
      style={{ borderRadius: "10px" }}
      className="cart deep-purple white-text"
      onClick={handleBasketShow}
      disabled={localStorage.getItem("Status") ? "" : "disabled"}
    >
      <i style={{ verticalAlign: "middle" }} className="material-icons">
        shopping_cart
      </i>
      {/* <span >Basket</span> */}
      {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
  );
}

export { Cart };
