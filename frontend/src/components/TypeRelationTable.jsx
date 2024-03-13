import { useEffect, useState, useSyncExternalStore } from "react";
import "../styles/TypeRelationTable.css";
import Type from "./Type";

const TypeRelationTable = (props) => {
  const primaryType = props.types ? props.types[0].type.name : "";
  const secondaryType =
    props.types && props.types.length == 2 ? props.types[1].type.name : "";
  const [primaryTypeRelations, setPrimaryTypeRelations] = useState({});
  const [secondaryTypeRelations, setSecondaryTypeRelations] = useState({});
  const [typeRelations, setTypeRelations] = useState({});

  const calculateTypeRelations = () => {
    const map = {};
    const primaryRelations = { ...primaryTypeRelations.relations };
    const secondaryRelations = { ...secondaryTypeRelations.relations };

    if (Object.keys(secondaryRelations).length !== 0) {
      for (const key of Object.keys(secondaryRelations)) {
        if (key in primaryRelations) {
          primaryRelations[key] =
            primaryRelations[key] * secondaryRelations[key];
        } else {
          primaryRelations[key] = secondaryRelations[key];
        }
      }
    }

    for (const key of Object.keys(primaryRelations)) {
      if (primaryRelations[key] in map) {
        map[primaryRelations[key]].push(key);
      } else {
        map[primaryRelations[key]] = [key];
      }
    }
    return map;
  };

  useEffect(() => {
    if (!props.types) {
      return;
    }
    setTypeRelations({});
    setPrimaryTypeRelations({});
    setSecondaryTypeRelations({});

    const fetchType = async (isSecondary) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: isSecondary ? secondaryType : primaryType,
        }),
      };

      const data = await fetch(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}/getTypeRelations`,
        requestOptions
      );

      const response = await data.json();

      isSecondary
        ? setSecondaryTypeRelations(response.results[0])
        : setPrimaryTypeRelations(response.results[0]);
    };

    const getTypes = async () => {
      await fetchType().catch(console.error);
      if (props.types.length == 2) {
        await fetchType(true).catch(console.error);
      }
    };
    getTypes();
  }, [props.types]);

  useEffect(() => {
    if (props.types) {
      if (props.types.length == 1 && primaryTypeRelations.relations) {
        setTypeRelations({ ...calculateTypeRelations() });
      } else if (
        props.types.length == 2 &&
        primaryTypeRelations.relations &&
        secondaryTypeRelations.relations
      ) {
        setTypeRelations({ ...calculateTypeRelations() });
      }
    }
  }, [primaryTypeRelations.relations, secondaryTypeRelations.relations]);

  return (
    <div className="type-relation-table">
      <table>
        {4 in typeRelations ? (
          <tr>
            <img className="type-relation" src="./ultraeffective.svg"></img>
            {typeRelations[4].map((typeName) => (
              <Type type={typeName}></Type>
            ))}
          </tr>
        ) : null}
        {2 in typeRelations ? (
          <tr>
            <img className="type-relation" src="./supereffective.svg"></img>
            {typeRelations[2].map((typeName) => (
              <Type type={typeName}></Type>
            ))}
          </tr>
        ) : null}
        {0.5 in typeRelations ? (
          <tr>
            <img className="type-relation" src="./superresistant.svg"></img>
            {typeRelations[0.5].map((typeName) => (
              <Type type={typeName}></Type>
            ))}
          </tr>
        ) : null}
        {0.25 in typeRelations ? (
          <tr>
            <img className="type-relation" src="./ultraresistant.svg"></img>
            {typeRelations[0.25].map((typeName) => (
              <Type type={typeName}></Type>
            ))}
          </tr>
        ) : null}
        {0 in typeRelations ? (
          <tr>
            <img className="type-relation" src="./immune.svg"></img>
            {typeRelations[0].map((typeName) => (
              <Type type={typeName}></Type>
            ))}
          </tr>
        ) : null}
      </table>
    </div>
  );
};

export default TypeRelationTable;
