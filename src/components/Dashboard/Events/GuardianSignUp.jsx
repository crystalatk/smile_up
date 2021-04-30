import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const GuardianSignUp = ({ userInfo, eventDetailsForEditPurposes }) => {
  const [minorData, setMinorData] = useState([]);
  const [signedUpMinorId, setSignedUpMinorId] = useState([]);
  const [termsApproved, setTermsApproved] = useState(false);
  const [volunteersSignedUp, setVolunteersSignedUp] = useState([]);
  const { event_id } = useParams();
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const history = useHistory();

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
      await fetch(`${process.env.REACT_APP_HOST}/volunteers/insertvolunteeractivity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteer_id: id,
          event_id: event_id,
          guardian_approval: true,
        }),
      }).then((response) => response.json());
    });
    history.goBack();
  };

  useEffect(() => {
    const getMinorData = () => {
      fetch(
        `${process.env.REACT_APP_HOST}/guardians/getvolunteersforguardianId/?guardian_id=${userInfo.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMinorData(data);
        });
    };
    const fetchVolunteersSignedUp = async () => {
      const VolSignedUpResponse = await fetch(
        `${process.env.REACT_APP_HOST}/admins/counttotalvolbyevent?event_id=${event_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      setVolunteersSignedUp(VolSignedUpResponse);
    };
    getMinorData();
    fetchVolunteersSignedUp();
  }, [userInfo, event_id]);

  return (
    <div className="sign-up-container">
      <h1>Sign-up today to bring smiles to the community!</h1>
      {!!minorData.length ? (
        <form onSubmit={_handleSubmit}>
          <>
            <h4>Minors to sign-up:</h4>
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
                          eventDetailsForEditPurposes.age_min >
                            minor.age.years ||
                          volunteersSignedUp.some(
                            (volunteer) => volunteer.volunteer_id === minor.id
                          )
                        }
                      />
                    }
                    label={`${minor.first_name} ${minor.last_name}`}
                  />
                  <h6
                    className={
                      eventDetailsForEditPurposes.age_min > minor.age.years
                        ? "f-red f-small m-0"
                        : "f-disappear f-small m-0"
                    }
                  >
                    This minor is not old enough to attend this event.
                  </h6>
                </>
              );
            })}
            <h4>Please check the boxes below to acknowledge that you agree:</h4>
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
            <br />

            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={!termsApproved}
            >
              Submit
            </Button>
            <Button onClick={history.goBack} type="button" variant="outlined">
              BACK
            </Button>
          </>
        </form>
      ) : (
        <h1>There is no data here ...</h1>
      )}
    </div>
  );
};

export default GuardianSignUp;
