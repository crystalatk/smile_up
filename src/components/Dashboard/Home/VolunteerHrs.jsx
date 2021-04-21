import { useEffect, useState } from "react";

const VolunteerHours = () => {
  const [volunteerHours, setVolunteerHours] = useState("");
  useEffect(() => {
    const getData = () => {
      fetch("http://127.0.0.1:3232/volunteers/volunteerHours")
        .then((res) => res.json())
        .then((data) => {
          setVolunteerHours(data[0].sum);
        });
    };
    getData();
  }, []);

  return (
    <>
      <h1 className="snippet-header">Total Hours</h1>
      {!!volunteerHours ? (
        <h2 className="snippet-content">{volunteerHours}</h2>
      ) : (
        <h3 className="snippet-content">noData</h3>
      )}
    </>
  );
};

export default VolunteerHours;
