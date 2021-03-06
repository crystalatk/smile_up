import { useEffect, useState } from "react";

const TotalSmiles = () => {
  const [totalSmiles, setTotalSmiles] = useState("");
  useEffect(() => {
    const getSmiles = () => {
      fetch(`${process.env.REACT_APP_HOST}/volunteers/totalSmiles`)
        .then((res) => res.json())
        .then((data) => {
          setTotalSmiles(data[0].sum);
        });
    };
    getSmiles();
  }, []);

  return (
    <>
      <h1 className="snippet-header">Total Smiles Given</h1>
      <h2 className="snippet-content">{totalSmiles}</h2>
    </>
  );
};

export default TotalSmiles;
