import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const MinorSignUp = ({ userInfo, eventDetailsForEditPurposes }) => {
  console.log("THIS IS THE USERINFO", userInfo);
  const [termsApproved, setTermsApproved] = useState(false);
  const { event_id } = useParams();
  const [checkBox1, setCheckBox1] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTermsApproved(checkBox1);
  }, [checkBox1]);

  const _handleSubmit = (e) => {
    e.preventDefault();
    const insertResponse = fetch(
      `http://127.0.0.1:3232/volunteers/insertvolunteeractivity`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteer_id: userInfo.id,
          event_id: event_id,
          guardian_approval: false,
        }),
      }
    ).then((response) => response.json());
    console.log(insertResponse);
    history.goBack();
  };

  return (
    <div className="m-20 b-background p-20">
      <h1>This is the Minor Sign Up</h1>
      <form onSubmit={_handleSubmit}>
        <>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedC"
                color="secondary"
                onChange={(e) => {
                  setCheckBox1(!checkBox1);
                }}
              />
            }
            label="I would like to attend this event, please get approval from my guardian"
          />
          <div className="m-5">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!termsApproved}
            >
              Submit
            </Button>
          </div>
        </>
      </form>
    </div>
  );
};

export default MinorSignUp;
