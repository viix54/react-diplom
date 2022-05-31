function ProfilOneItem(props) {
  const { prodN, Kolich } = props;

  return (
    <li className="collection-item">
      {prodN} x {Kolich}
    </li>
  );
}

export { ProfilOneItem };
