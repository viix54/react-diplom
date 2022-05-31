import { Cart } from "./Cart";
import { ProfilCart } from "./Profil_cart";
import { RecomCart } from "./Recom_cart";
import { CartForOtherPages } from "./Cart_ForOtherPages";

function CartsUsersForOthers() {
  return (
    <>
      <CartForOtherPages />
      <ProfilCart />
      <RecomCart />
    </>
  );
}
export { CartsUsersForOthers };
