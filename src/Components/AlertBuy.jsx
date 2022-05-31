import { useEffect } from "react";

function AlertBuy(props) {
  const { closeAlertBuy = Function.prototype } = props;

  useEffect(() => {
    const timerId = setTimeout(closeAlertBuy, 3000);

    return () => {
      clearTimeout(timerId);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div id="toast-container">
      <div className="toast">Оплачено</div>
    </div>
  );
}

export { AlertBuy };
