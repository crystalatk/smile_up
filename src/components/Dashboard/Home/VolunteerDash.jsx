import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const VolunteerDash = () => {
  return (
    <div>
      <h1>Volunteer Dash</h1>
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "rgb(250, 193, 135)", height: "74vh" }}
        >
          <h1>Info inside or component goes here</h1>
        </Typography>
      </Container>
    </div>
  );
};

export default VolunteerDash;
