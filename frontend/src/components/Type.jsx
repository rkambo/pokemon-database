import "../styles/Type.css";

const Type = (props) => {
  return (
    <div className={"type " + props.type}>
      <h1 style={{ textTransform: "uppercase" }}>{props.type}</h1>
    </div>
  );
};

export default Type;
