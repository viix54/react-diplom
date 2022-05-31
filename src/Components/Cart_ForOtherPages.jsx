import { useNavigate } from "react-router-dom";

function CartForOtherPages() {
  const nav = useNavigate();
  return (
    <div
      style={{ borderRadius: "10px" }}
      className="cart-new deep-purple white-text"
    >
      <i
        style={{ verticalAlign: "middle" }}
        className="material-icons"
        onClick={() => {
          nav("/");
        }}
      >
        shopping_cart
      </i>{" "}
      {/* <span>Profil</span> */}
    </div>
  );
}

export { CartForOtherPages };
