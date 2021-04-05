import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import VolunteerDirectory from "./VolunteerDirectory";

const AdminDir = ({ userInfo }) => {
  return (
    <div>
      <h1>Directory</h1>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Typography
            component="div"
            style={{ backgroundColor: "rgb(250, 193, 135)", height: "74vh" }}
          >
            <VolunteerDirectory userInfo={userInfo} />
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default AdminDir;
