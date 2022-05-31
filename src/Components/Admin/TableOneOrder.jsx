function TableOneOrder(props) {
  const { Client, Kolich, TimeOfOrd, ProdN } = props;

  return (
    <tr style={{ width: "100%" }}>
      <td style={{ width: "25%" }}>{ProdN}</td>
      <td style={{ width: "25%" }}>{Client}</td>
      <td style={{ width: "25%" }}>{Kolich}</td>
      <td style={{ width: "25%" }}>{TimeOfOrd}</td>
    </tr>
  );
}

export { TableOneOrder };
