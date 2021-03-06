import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import VolunteerNav from "./VolunteerNav";
import HomeNav from "./HomeNav";

const Nav = ({ userInfo }) => {
  const [numberOfApprovalsWaiting, setNumberOfApprovalsWaiting] = useState(0);

  useEffect(() => {
    const fetchMinorsEvents = async () => {
      const guardianEventResponse = await fetch(
        `${process.env.REACT_APP_HOST}/events/needsapprovaleventsbyguardianid/?guardian_id=${userInfo.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((response) => response.json());
      setNumberOfApprovalsWaiting(guardianEventResponse.length);
    };
    const fetchNeedsApprovalEventsForMinor = async () => {
      const needsApprovalEventsForMinorResponse = await fetch(
        `${process.env.REACT_APP_HOST}/events/needsapprovaleventsbyvolunteerid/?volunteer_id=${userInfo.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((response) => response.json());
      setNumberOfApprovalsWaiting(needsApprovalEventsForMinorResponse.length);
    };
    if (userInfo.is_guardian) {
      fetchMinorsEvents();
    }
    if (userInfo.is_minor) {
      fetchNeedsApprovalEventsForMinor();
    }
  }, [userInfo]);

  return (
    <div className="footer">
      {userInfo.is_admin && <AdminNav userInfo={userInfo} />}
      {(userInfo.is_minor || userInfo.is_guardian) && (
        <VolunteerNav
          userInfo={userInfo}
          numberOfApprovalsWaiting={numberOfApprovalsWaiting}
          setNumberOfApprovalsWaiting={setNumberOfApprovalsWaiting}
        />
      )}
      {!userInfo.isLoggedIn && <HomeNav userInfo={userInfo} />}
    </div>
  );
};
export default Nav;
