import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

const CheckOut = () => {
  const history = useHistory();
  const { va_id } = useParams();
  const [volunteerInfo, setVolunteerInfo] = useState("");

  useEffect(() => {
    const fetchVolunteerInfo = async () => {
      const VolunteerInfoResponse = await fetch(
        `http://127.0.0.1:3232/volunteers/volunteerinfofromvaid/?va_id=${va_id}`
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log("THIS IS THE VOLUNTEER INFO: ", VolunteerInfoResponse);
      setVolunteerInfo(VolunteerInfoResponse);
    };
    fetchVolunteerInfo();
  }, []);

  const _handleSubmitCheckOut = (e) => {
    e.preventDefault();
    const fetchInsertCheckOutTime = async () => {
      const InsertCheckOutTimeResponse = await fetch(
        `http://127.0.0.1:3232/admins/insertcheckinouttime`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            va_id: va_id,
            event: "check_out_time",
          }),
        }
      ).then((response) => response);
      console.log(
        "THIS IS THE INSERT CHECK OUT TIME RESPONSE: ",
        InsertCheckOutTimeResponse
      );
    };
    fetchInsertCheckOutTime();
    history.goBack();
  };

  return (
    <>
      <h1>
        Check-out {volunteerInfo?.first_name} {volunteerInfo?.last_name}:
      </h1>
      <Button onClick={_handleSubmitCheckOut}>Check-out</Button>
      <Button
        onClick={(e) => {
          history.goBack();
        }}
      >
        Back
      </Button>
    </>
  );
};

export default CheckOut;
