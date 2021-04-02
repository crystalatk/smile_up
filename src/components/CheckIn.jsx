import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";

const CheckIn = () => {
  const history = useHistory();
  const { event_id, volunteer_id } = useParams();

  console.log("The event id is:", event_id);
  console.log("The volunteer id is:", volunteer_id);

  return (
    <>
      <h1>This is the check-in Component</h1>
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
