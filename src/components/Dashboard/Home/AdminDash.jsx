import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TotalVolunteers from "./TotalVolunteers";
import VolunteerHours from "./VolunteerHrs";
import TotalSmiles from "./TotalSmiles";
import TotalEvents from "./TotalEvents";

const AdminDash = ({ userInfo }) => {
  return (
    <div>
      <h1>Dash</h1>
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "rgb(250, 193, 135)", height: "74vh" }}
        >
          <h1>Info inside or component goes here</h1>
          <TotalVolunteers userInfo={userInfo} />
          <VolunteerHours userInfo={userInfo} />
          <TotalSmiles />
          <TotalEvents />
        </Typography>
      </Container>
    </div>
  );
};

export default AdminDash;
