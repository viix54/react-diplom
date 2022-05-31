import { useNavigate } from "react-router-dom";

function LoginCart() {
  const nav = useNavigate();
  return (
    <div
      style={{
        borderRadius: "10px",
        position: "absolute",
        right: "1rem",
        top: "1rem",
      }}
    >
      {localStorage.getItem("Status") ? (
        <button
          className="btn deep-purple"
          onClick={() => {
            nav("/login");
            localStorage.clear();
          }}
        >
          Log out
        </button>
      ) : (
        <button
          className="btn deep-purple"
          onClick={() => {
            nav("/login");
          }}
        >
          Log in
        </button>
      )}
    </div>
  );
}

export { LoginCart };
