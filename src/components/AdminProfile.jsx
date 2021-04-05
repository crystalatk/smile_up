import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import VolunteerProfile from "./VolunteerProfile";

const AdminProfile = ({ userInfo }) => {
  return (
    <div>
      <h1>Profile</h1>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Typography
            component="div"
            style={{ backgroundColor: "rgb(250, 193, 135)", height: "74vh" }}
          >
            <VolunteerProfile userInfo={userInfo} />
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default AdminProfile;
