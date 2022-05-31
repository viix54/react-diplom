function GoodItem(props) {
  const {
    ID: id,
    ProdN: name,
    Kolich: kolich,
    Cost: cost,
    StranaPr: proizv,
    Picture: pic,
    addToBasket = Function.prototype,
    idrec,
  } = props;

  // const handleRecId = () => {
  //   console.log(idrec + " " + id);
  //   if (idrec) {
  //     if (+idrec === +id) {
  //       console.log("YEP");
  //       console.log(document.getElementById(`span_${idrec}`));
  //       // document.getElementById(`span_${idrec}`).style.color = "red";
  //       // document.getElementById(`span_${idrec}`).style.fontWeight = "bold";
  //     }
  //   }
  // };

  return (
    <>
      <div className="card">
        <div className="card-image">
          <img src={pic} alt={name} style={{ height: "100%" }} />
        </div>
        <div className="card-content">
          <span className="card-title">{name}</span>
          {/* {handleRecId()} */}
          <p>{proizv}</p>
        </div>
        <div className="card-action">
          <button
            disabled={localStorage.getItem("Status") ? "" : "disabled"}
            className="btn deep-purple"
            onClick={() => {
              addToBasket({ id, name, cost });
            }}
          >
            Купить
          </button>
          <span className="right " style={{ fontSize: "1.8rem" }}>
            {cost} руб.
          </span>
        </div>
      </div>
    </>
  );
}

export { GoodItem };
