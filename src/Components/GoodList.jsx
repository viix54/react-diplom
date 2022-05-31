import { GoodItem } from "../Components/GoodItem";

function GoodList(props) {
  const { goods = [], addToBasket = Function.prototype, idrec } = props;

  return (
    <div className="goods">
      {goods.length ? (
        goods.map((tovar) => (
          <GoodItem
            key={tovar.ID}
            {...tovar}
            addToBasket={addToBasket}
            idrec={idrec}
          />
        ))
      ) : (
        <h4>Nothing found</h4>
      )}
    </div>
  );
}

export { GoodList };
