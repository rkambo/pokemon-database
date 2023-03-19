const Summary = (props) => {
  const getEntry = () => {
    const entries = props.entries.filter((entry) => {});
    console.log("Entries: " + entries);
    return entries[0];
  };

  return (
    <div>
      {!props.category ? <h1></h1> : <h1>The {props.category[7].genus}</h1>}
      {!props.entries ? <h1></h1> : <h1>{getEntry()}</h1>}
    </div>
  );
};

export default Summary;
