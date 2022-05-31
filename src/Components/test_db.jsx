import axios from "axios";

function Test() {
  const handleClick = () => {
    axios.post(`http://localhost:4000/addTask`, {
      task: "1234",
    });
  };
  return (
    <>
      <button className="btn" onClick={handleClick}>
        TESTBd
      </button>
    </>
  );
}

export { Test };
