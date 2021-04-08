import { useEffect, useState } from "react";

const TotalSmiles = () => {
  const [totalSmiles, setTotalSmiles] = useState("");
  useEffect(() => {
    const getSmiles = () => {
      fetch("http://127.0.0.1:3232/volunteers/totalSmiles")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
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
