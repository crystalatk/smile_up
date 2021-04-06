import { Route, Link } from "react-router-dom";

const NewMinorAccountBridge = ({ guardianId }) => {
  return (
    <div>
      <p>
        You indicated that you are the parent or guardian of a smileUp volunteer
        who is a minor. Would you like to create their account(s) now?
      </p>
      <Link to={`/newminor/${guardianId}`}>Yes</Link>
    </div>
  );
};

export default NewMinorAccountBridge;
