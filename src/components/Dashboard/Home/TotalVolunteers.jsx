import { useEffect, useState } from "react";

const TotalVolunteers = () => {
  const [totalVolunteers, setTotalVolunteers] = useState("");
  useEffect(() => {
    (async () => {
      const volunteerTotal = await fetch(
        `${process.env.REACT_APP_HOST}/volunteers/totalVolunteers`
      ).then((response) => response.json());
      console.log("This is the volunteer total:", volunteerTotal);
      setTotalVolunteers(volunteerTotal.length);
    })();
  }, []);

  return (
    <>
      <h1 className="snippet-header">Total Volunteers</h1>
      {!!totalVolunteers ? (
        <h1 className="snippet-content">{totalVolunteers}</h1>
      ) : (
        <p className="snippet-content">Getting Total ...</p>
      )}
    </>
  );
};

export default TotalVolunteers;
