import axios from "axios";
import { useState } from "react";

function TableOneUser(props) {
  const { Login, Status, Banned } = props;

  const [statusUser, setStatusUser] = useState(Status);
  const [isBanned, setBanned] = useState(Banned);

  const makeAdmin = () => {
    axios
      .post("http://localhost:4000/makeAdmin", {
        user: Login,
      })
      .then((result) => {
        setStatusUser("Admin");
      });
  };

  const makeBanned = () => {
    axios
      .post("http://localhost:4000/makeBanned", {
        user: Login,
        bannedStatus: Banned,
      })
      .then((result) => {
        console.log(result);
        setBanned(1);
      });
  };

  return (
    <tr style={{ width: "100%" }}>
      <td style={{ width: "25%" }}>{Login}</td>
      {console.log(statusUser)}
      <td style={{ width: "25%" }}>
        {statusUser === "Admin" ? "Admin" : "User"}
      </td>
      <td style={{ width: "25%" }}>{isBanned ? "Banned" : "Not Banned"}</td>
      <td style={{ width: "25%" }}>
        <button
          className="btn deep-purple"
          disabled={statusUser === "Admin" || isBanned ? "disabled" : ""}
          onClick={makeBanned}
        >
          Ban
        </button>{" "}
        <button
          className="btn deep-purple"
          onClick={makeAdmin}
          disabled={statusUser === "Admin" || isBanned ? "disabled" : ""}
        >
          Admin
        </button>
      </td>
    </tr>
  );
}

export { TableOneUser };
