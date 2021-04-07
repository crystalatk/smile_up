import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GuardianSignUp = ({ userInfo, eventDetailsForEditPurposes }) => {
  const [minorData, setMinorData] = useState([]);
  const [signedUpMinorId, setSignedUpMinorId] = useState([]);
  const [termsApproved, setTermsApproved] = useState(false);
  const { event_id } = useParams();
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);

  useEffect(() => {
    setTermsApproved(checkBox1 && checkBox2);
  }, [checkBox1, checkBox2]);

  const _handleCheck = (e) => {
    if (signedUpMinorId.includes(e.target.value)) {
      setSignedUpMinorId(signedUpMinorId.filter((id) => id !== e.target.value));
    } else {
      setSignedUpMinorId([...signedUpMinorId, e.target.value]);
    }
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    signedUpMinorId.map(async (id) => {
      await fetch(`http://127.0.0.1:3232/volunteers/insertvolunteeractivity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteer_id: id,
          event_id: event_id,
          guardian_approval: true,
        }),
      }).then((response) => response.json());
    });
  };

  useEffect(() => {
    const getMinorData = () => {
      fetch(
        `http://127.0.0.1:3232/guardians/getvolunteersforguardianId/?guardian_id=${userInfo.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMinorData(data);
        });
    };
    getMinorData();
  }, [userInfo]);

  useEffect(() => {
    console.log("this is MINORDATA", minorData);
    console.log("THESE ARE THE EVENT DETAILS: ", eventDetailsForEditPurposes);
  }, [minorData]);

  return (
    <div>
      <h1>This is the Guardian Sign Up</h1>
      {!!minorData.length ? (
        <form onSubmit={_handleSubmit}>
          <>
            {minorData.map((minor) => {
              return (
                <>
                  <FormControlLabel
                    key={minor.id}
                    control={
                      <Checkbox
                        name="checkedC"
                        color="secondary"
                        value={minor.id}
                        onChange={_handleCheck}
                        disabled={
                          eventDetailsForEditPurposes.age_min > minor.age.years
                        }
                      />
                    }
                    label={`${minor.first_name} ${minor.last_name}`}
                  />
                  <h6
                    className={
                      eventDetailsForEditPurposes.age_min > minor.age.years
                        ? "f-red f-small m-0"
                        : "f-background-color f-small m-0"
                    }
                  >
                    This minor is not old enough to attend this event.
                  </h6>
                </>
              );
            })}
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
              label="I agree to allow the above minors to attend this event"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedC"
                  color="secondary"
                  onChange={(e) => {
                    setCheckBox2(!checkBox2);
                  }}
                />
              }
              label="I agree to provide supervision to any above minors under the age of 12"
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

export default GuardianSignUp;
