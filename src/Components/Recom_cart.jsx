import { useNavigate } from "react-router-dom";

function RecomCart() {
  const nav = useNavigate();
  return (
    <div
      style={{ borderRadius: "10px" }}
      className="cart-recom deep-purple white-text"
      disabled={localStorage.getItem("Status") ? "" : "disabled"}
    >
      <i
        style={{ verticalAlign: "middle" }}
        className="material-icons"
        onClick={() => {
          nav("/recomendation");
        }}
      >
        wrap_text
      </i>{" "}
      {/* <span>Profil</span> */}
    </div>
  );
}

export { RecomCart };
