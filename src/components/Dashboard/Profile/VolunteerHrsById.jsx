import { useEffect, useState } from "react";

const VolunteerHrsById = ({ id }) => {
  const [vhid, setVH] = useState("");
  useEffect(() => {
    if (id) {
      const getVH = () => {
        fetch(
          `${process.env.REACT_APP_HOST}/volunteers/volunteerHoursId?volunteer_id=${id}`
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
    <div className="block">
      <h1 className="m-0">Total Hours </h1>
      {!!vhid ? <h2 className="m-0">{vhid}</h2> : <h3 className="m-0">0</h3>}
    </div>
  );
};

export default VolunteerHrsById;
