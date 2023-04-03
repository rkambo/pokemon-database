const Summary = (props) => {
  const getEntry = () => {
    const entries = props.entries.filter(
      (entry) => entry.language.name == "en"
    );
    if (entries.length == 0) {
      return "Not enough information about this Pokemon has been discovered yet!";
    }
    return entries[Math.floor(Math.random() * (entries.length - 1))]
      .flavor_text;
  };

  const getCategory = () => {
    const category = props.category;
    if (category && category.length <= 7) {
      return "??? Pokemon";
    } else {
      return <>The {category[7].genus}</>;
    }
  };

  return (
    <div>
      {!props.category ? <h1></h1> : <h1>{getCategory()}</h1>}
      {!props.entries ? <h1></h1> : <h1>{getEntry()}</h1>}
    </div>
  );
};

export default Summary;
