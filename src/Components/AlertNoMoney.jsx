import { useEffect } from "react";

function AlertNoMoney(props) {
  const { closeAlertNoMoney = Function.prototype } = props;

  useEffect(() => {
    const timerId = setTimeout(closeAlertNoMoney, 3000);

    return () => {
      clearTimeout(timerId);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div id="toast-container">
      <div className="toast">Недостаточно средств</div>
    </div>
  );
}

export { AlertNoMoney };
