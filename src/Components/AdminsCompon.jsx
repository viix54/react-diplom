import { Cart } from "./Cart";
import { ProfilCart } from "./Profil_cart";
import { RecomCart } from "./Recom_cart";
import { CardTableOrder } from "./Admin/CartTableOrder";
import { CardTableUsers } from "./Admin/CartTableUsers";

function AdminsCompon(props) {
  const { quantity = 0, handleBasketShow = Function.prototype } = props;
  return (
    <>
      <Cart quantity={quantity} handleBasketShow={handleBasketShow} />
      <ProfilCart />
      <RecomCart />
      <CardTableUsers />
      <CardTableOrder />
    </>
  );
}

export { AdminsCompon };
