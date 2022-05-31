import { Cart } from "./Cart";
import { ProfilCart } from "./Profil_cart";
import { RecomCart } from "./Recom_cart";

function UsersComponents(props) {
  const { quantity = 0, handleBasketShow = Function.prototype } = props;
  return (
    <>
      <Cart quantity={quantity} handleBasketShow={handleBasketShow} />
      <ProfilCart />
      <RecomCart />
    </>
  );
}
export { UsersComponents };
