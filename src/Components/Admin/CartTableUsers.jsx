import { Link } from "react-router-dom";

function CardTableUsers(props) {
  return (
    <Link to="/tableUsers">
      <div
        id="div-cart-table-users"
        style={{ borderRadius: "10px" }}
        className="cart deep-purple white-text cart-table-users"
      >
        <i style={{ verticalAlign: "middle" }} className="material-icons">
          folder_shared
        </i>{" "}
        {/* <span>UsersTable</span> */}
      </div>
    </Link>
  );
}

export { CardTableUsers };
