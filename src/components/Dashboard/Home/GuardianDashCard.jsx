import { Link } from "react-router-dom";
import EventCards from "./EventCards";

const GuardianDashCard = ({ title, route, userInfo }) => {
  return (
    <>
      <div className="card-container">
        <h3 className="card-header f-med-teal m-5">{title}</h3>
        <div className="inner-card">
          <EventCards userInfo={userInfo} title={title} />
        </div>
        <div className="card-footer">
          <h4 className="m-0">
            <Link className="f-med-teal" to={route}>
              See More
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
};

export default GuardianDashCard;
