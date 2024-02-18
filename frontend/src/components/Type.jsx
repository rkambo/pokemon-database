import "../styles/Type.css";

const Type = (props) => {
  return (
    <div className={"type " + props.type.type.name}>
      <h1 style={{ textTransform: "uppercase" }}>{props.type.type.name}</h1>
    </div>
  );
};

export default Type;
