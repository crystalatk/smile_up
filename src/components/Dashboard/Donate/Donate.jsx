import { Link } from "react-router-dom";

const Donate = () => {
  return (
    <div className="donate-card-container">
      <div className="card-header">
        <h1 className=" f-med-teal m-5">Donate Today!</h1>
      </div>
      <div className="admin-inner-card">
        <Link to="https://www.paypal.com/us/fundraiser/charity/1851712">
          <img
            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
            alt="PayPal"
          />
        </Link>
      </div>
      <div className="admin-inner-card center">
        <Link to="https://venmo.com/smileup">
          <img src="./images/venmo.png" alt="Venmo" className="venmo-logo" />
        </Link>
      </div>
      <div className="admin-inner-card center">
        <Link to="https://smile.amazon.com/gp/chpf/homepage?orig=%2F">
          <img src="./images/amazon.png" alt="Amazon" className="venmo-logo" />
        </Link>
      </div>
      <div className="admin-inner-card center">
        <Link to="https://www.mightycause.com/organization/Smileup">
          <img
            src="./images/mighty.png"
            alt="MightyCause"
            className="venmo-logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Donate;
