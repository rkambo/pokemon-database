const Summary = (props) => {
  const getEntry = () => {
    const entries = props.entries.filter(
      (entry) => entry.language.name == "en"
    );
    return entries[Math.floor(Math.random() * (entries.length - 1))]
      .flavor_text;
  };

  return (
    <div>
      {!props.category ? <h1></h1> : <h1>The {props.category[7].genus}</h1>}
      {!props.entries ? <h1></h1> : <h1>{getEntry()}</h1>}
    </div>
  );
};

export default Summary;
