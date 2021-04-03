import AdminNav from "./AdminNav";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";



const AdminCheckin = () => {
    return (
        <div>
            <h1>Check-in</h1>
            <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Typography
            component="div"
            style={{ backgroundColor: "rgb(250, 193, 135)", height: "74vh" }}
          >
            <h1>Info inside or component goes here</h1>
          </Typography>
        </Container>
      </React.Fragment>
      <div className="footer"></div>
            <div className="footer">
        <AdminNav />
      </div>
        </div>
    )
}

export default AdminCheckin
