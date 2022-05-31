import { Link } from "react-router-dom";

function CardTableOrder() {
  return (
    <Link to="/tableOrders">
      <div
        style={{ borderRadius: "10px" }}
        className="cart deep-purple white-text cart-table-orders"
        disabled={localStorage.getItem("Status") ? "" : "disabled"}
      >
        <i style={{ verticalAlign: "middle" }} className="material-icons">
          playlist_add_check
        </i>{" "}
        {/* <span>UsersTable</span> */}
      </div>
    </Link>
  );
}

export { CardTableOrder };
