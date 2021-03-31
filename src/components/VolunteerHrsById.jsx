import { useEffect, useState } from "react";

const VHID = ({ userInfo }) => {
  const [vhid, setVH] = useState("");
  useEffect(() => {
    if (userInfo.id) {
      const getVH = () => {
        fetch(
          `http://127.0.0.1:3232/volunteers/volunteerHoursId?volunteer_id=${userInfo.id}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setVH(data[0].sum);
          });
      };
      getVH();
    }
  }, []);

  return (
    <>
      <h1>Total Hours </h1>
      {!!vhid ? <h2>{vhid}</h2> : <h3>nothing is here</h3>}
    </>
  );
};

export default VHID;
