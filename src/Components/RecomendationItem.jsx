import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RecomendationItem(props) {
  const nav = useNavigate();
  const {
    ID: id,
    ProdN: name,
    Kolich: kolich,
    Cost: cost,
    Picture: pic,
    StranaPr: proizv,
    important = 0,
  } = props;

  return (
    <div className="card">
      <div className="card-image">
        <img src={pic} alt={name} style={{ height: "100%" }} />
      </div>
      <div className="card-content">
        <span className="card-title">{name}</span>
        <p>{proizv}</p>
        <span style={{ color: "#673ab7 ", fontWeight: "bold" }}>
          {important ? "Больше всего понравится!" : null}
        </span>
      </div>
      <div className="card-action">
        <button
          className="btn deep-purple"
          onClick={() => {
            nav("/" + id);
          }}
        >
          Перейти{" "}
        </button>
        <span className="right " style={{ fontSize: "1.8rem" }}>
          {cost} руб.
        </span>
      </div>
    </div>
  );
}

export { RecomendationItem };
