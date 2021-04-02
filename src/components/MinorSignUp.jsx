import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const MinorSignUp = ({ userInfo }) => {
  const [minorData, setMinorData] = useState([]);
  const [signedUpMinorId, setSignedUpMinorId] = useState([]);
  const [termsApproved, setTermsApproved] = useState(false);
  const { event_id } = useParams();
  const [checkBox1, setCheckBox1] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTermsApproved(checkBox1);
  }, [checkBox1]);

  const _handleCheck = (e) => {
    if (signedUpMinorId.includes(e.target.value)) {
      setSignedUpMinorId(signedUpMinorId.filter((id) => id !== e.target.value));
    } else {
      setSignedUpMinorId([...signedUpMinorId, e.target.value]);
    }
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
      const insertResponse = await fetch(
        `http://127.0.0.1:3232/volunteers/insertvolunteeractivity`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guardian_id: id,
            event_id: event_id,
            guardian_approval: false,
          }),
        }
      ).then((response) => response.json());
      console.log(insertResponse);
      history.goBack();
  };

  useEffect(() => {
    console.log(userInfo.id);
    const getMinorData = () => {
      fetch(
        `http://127.0.0.1:3232/guardians/getguardianforvolunteerId/?volunteer_id=${userInfo.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMinorData(data);
        });
    };
    getMinorData();
  }, [userInfo]);

  useEffect(() => {
    console.log("this is our array", signedUpMinorId);
  }, [signedUpMinorId]);

  return (
    <div>
      <h1>This is the Minor Sign Up</h1>
      {!!minorData.length ? (
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

            <button type="submit" disabled={!termsApproved}>
              Submit
            </button>
          </>
        </form>
      ) : (
        <h1>There is no data here ...</h1>
      )}
    </div>
  );
};

export default MinorSignUp;
