import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

const CheckIn = () => {
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
      setVolunteerInfo(VolunteerInfoResponse);
    };
    fetchVolunteerInfo();
  }, [va_id]);

  const _handleSubmitCheckIn = (e) => {
    e.preventDefault();
    const fetchInsertCheckInTime = async () => {
      const InsertCheckInTimeResponse = await fetch(
        `http://127.0.0.1:3232/admins/insertcheckinouttime`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            va_id: va_id,
            event: "check_in_time",
          }),
        }
      ).then((response) => response);
    };
    fetchInsertCheckInTime();
    history.goBack();
  };

  return (
    <>
      <h1>
        Check-in {volunteerInfo?.first_name} {volunteerInfo?.last_name}:
      </h1>
      <Button onClick={_handleSubmitCheckIn}>Check-in</Button>
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

export default CheckIn;
