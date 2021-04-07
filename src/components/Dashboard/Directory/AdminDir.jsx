import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import VolunteerDirectory from "./VolunteerDirectory";

const AdminDir = ({ userInfo }) => {
  return (
    <div>
      <h1>Directory</h1>
      <Container fixed>
        <Typography component="div">
          <VolunteerDirectory userInfo={userInfo} />
        </Typography>
      </Container>
    </div>
  );
};

export default AdminDir;
