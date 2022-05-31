import { useNavigate } from "react-router-dom";

function ProfilCart() {
  const nav = useNavigate();
  return (
    <div
      style={{ borderRadius: "10px" }}
      className="cart-profil deep-purple white-text"
    >
      <i
        style={{ verticalAlign: "middle" }}
        className="material-icons"
        onClick={() => {
          nav("/profil");
        }}
      >
        assignment_ind
      </i>{" "}
      {/* <span>Profil</span> */}
    </div>
  );
}

export { ProfilCart };
