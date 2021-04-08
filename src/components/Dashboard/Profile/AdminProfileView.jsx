import { useEffect, useState, forwardRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import moment from "moment";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  AccountCircleIcon: forwardRef((props, ref) => (
    <AccountCircleIcon {...props} ref={ref} />
  )),
};

const AdminProfileView = ({ userInfo }) => {
  const history = useHistory();
  const { id: initialID } = useParams();
  const id = parseInt(initialID);
  const [volunteerInfo, setVolunteerInfo] = useState({});
  const [volunteerEvents, setVolunteerEvents] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileDataResponse = await fetch(
        `http://127.0.0.1:3232/volunteers/profile?id=${id}`
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log("THIS IS THE PROFILE DATA:", profileDataResponse);
      setVolunteerInfo(profileDataResponse);
    };
    const fetchVolunteerEvents = async () => {
      const volunteerEventsResponse = await fetch(
        `http://127.0.0.1:3232/volunteers/getallvolunteeractivities?volunteer_id=${id}`
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log("THIS IS THE EVENT DATA:", volunteerEventsResponse);
      setVolunteerEvents(volunteerEventsResponse);
    };

    fetchProfileData();
    fetchVolunteerEvents();
  }, [userInfo]);

  return (
    <>
      {userInfo.is_admin && volunteerInfo.id ? (
        <>
          <div className="table" style={{ maxWidth: "100%" }}>
            <MaterialTable
              icons={tableIcons}
              columns={[
                { title: "First Name", field: "first_name" },
                { title: "Last Name", field: "last_name" },
                { title: "Date of Birth", field: "dateBirth" },
                { title: "Phone Number", field: "phone" },
                { title: "Email", field: "email" },
                { title: "Age", field: "age" },
                { title: "Emergency Contact", field: "emergency_name" },
                { title: "Emergency Phone #", field: "emergency_phone" },
                { title: "Date Joined", field: "dateJoin" },
                { title: "Ambassador?", field: "is_ambassador" },
                { title: "Minor?", field: "isMinor" },
                { title: "Guardian?", field: "is_guardian" },
                { title: "Last Updated", field: "updated" },
              ]}
              data={[volunteerInfo].map((volunteer) => ({
                ...volunteer,
                dateBirth: moment(volunteer.date_of_birth).format(
                  "MMM DD, YYYY"
                ),
                isMinor: moment().diff(volunteer.date_of_birth, "years") < 18,
                age: moment().diff(volunteer.date_of_birth, "years"),
                dateJoin: moment(volunteer.date_joined).format("MMM DD, YYYY"),
                updated: moment(volunteer.updated_at).format("MMM DD, YYYY"),
              }))}
              title={`${volunteerInfo.first_name}'s Info`}
              options={{ pageSize: 1 }}
              actions={[
                {
                  icon: Edit,
                  tooltip: "Edit Volunteer",
                  onClick: (event, rowData) => {
                    // console.log("THIS IS THE ROW DATA: ", rowData);
                    history.push(`/profile/editprofile/${rowData.id}`);
                  },
                },
              ]}
            />
          </div>
          <div className="table" style={{ maxWidth: "100%" }}>
            <MaterialTable
              icons={tableIcons}
              columns={[
                { title: "Event", field: "title" },
                { title: "Date", field: "date" },
                { title: "Date Signed Up", field: "signUp" },
                { title: "Check-in", field: "startTime" },
                { title: "Check-out", field: "endTime" },
                { title: "Location", field: "location" },
                { title: "Total Time", field: "totalTime" },
                { title: "Guardian Approval?", field: "guardian_approval" },
              ]}
              data={volunteerEvents.map((event) => ({
                ...event,
                signUp: moment(event.date_signed_up).format("MMM DD, YYYY"),
                date: moment(event.date_start).format("MMM DD, YYYY"),
                startTime: event.check_in_time
                  ? moment(event.check_in_time).format("hh:mm a")
                  : "N/A",
                endTime: event.check_out_time
                  ? moment(event.check_out_time).format("hh:mm a")
                  : "N/A",
                totalTime: event.check_out_time
                  ? `${Math.floor(event.minutes / 60)}hr & ${
                      event.minutes % 60
                    }min`
                  : "N/A",
              }))}
              title={`Events that ${volunteerInfo.first_name} has signed up to attend:`}
              options={{ pageSize: 5 }}
            />
          </div>
        </>
      ) : (
        <h1>You must be an admin to access this page.</h1>
      )}
    </>
  );
};

export default AdminProfileView;
