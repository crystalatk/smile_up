import GuardianDashCard from "./GuardianDashCard";

const GuardianDash = ({ userInfo }) => {
  return (
    <div>
      <div className="dashboard-container">
        <GuardianDashCard
          userInfo={userInfo}
          title="Needs Approval"
          route="/notifications/0"
        />
        <GuardianDashCard
          userInfo={userInfo}
          title="My Events (Approved)"
          route="/notifications/1"
        />
        <GuardianDashCard
          userInfo={userInfo}
          title="Upcoming Events"
          route="/events"
        />
      </div>
    </div>
  );
};

export default GuardianDash;
