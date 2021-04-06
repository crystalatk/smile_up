import { useEffect, useState } from "react";

const VolunteerHrsById = ({ id }) => {
  const [vhid, setVH] = useState("");
  useEffect(() => {
    if (id) {
      const getVH = () => {
        fetch(
          `http://127.0.0.1:3232/volunteers/volunteerHoursId?volunteer_id=${id}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setVH(data[0].sum);
          });
      };
      getVH();
    }
  }, [id]);

  return (
    <>
      <h1>Total Hours </h1>
      {!!vhid ? <h2>{vhid}</h2> : <h3>0</h3>}
    </>
  );
};

export default VolunteerHrsById;
