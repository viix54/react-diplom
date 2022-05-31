import { ProfilCart } from "./Profil_cart";
import { RecomCart } from "./Recom_cart";
import { CardTableOrder } from "./Admin/CartTableOrder";
import { CardTableUsers } from "./Admin/CartTableUsers";
import { CartForOtherPages } from "./Cart_ForOtherPages";

function CartsAdminForOthers() {
  return (
    <>
      <CartForOtherPages />
      <ProfilCart />
      <RecomCart />
      <CardTableUsers />
      <CardTableOrder />
    </>
  );
}

export { CartsAdminForOthers };
