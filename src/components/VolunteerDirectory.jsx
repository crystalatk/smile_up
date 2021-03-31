import { useEffect, useState, forwardRef } from "react";
import { Link, useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Add from "@material-ui/icons/Add";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import moment from "moment";

const VolunteerDirectory = ({ userInfo }) => {
  const [volunteersData, setVolunteersData] = useState([]);
  const history = useHistory();

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
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
  };

  useEffect(() => {
    console.log(userInfo);
    const fetchVolunteerList = async () => {
      const VolunteerListResponse = await fetch(
        "http://127.0.0.1:3232/admins/volunteerslist"
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log(
        "THIS IS THE VOLUNTEER LIST RESPONSE: ",
        VolunteerListResponse
      );
      setVolunteersData(VolunteerListResponse);
    };
    fetchVolunteerList();
  }, []);
  return (
    <>
      {userInfo.is_admin ? (
        <>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              icons={tableIcons}
              columns={[
                { title: "First Name", field: "first_name" },
                { title: "Last Name", field: "last_name" },
                { title: "Phone Number", field: "phone" },
                { title: "Age", field: "age" },
                { title: "Minor?", field: "isMinor" },
                { title: "Guardian?", field: "is_guardian" },
              ]}
              data={volunteersData.map((volunteer) => ({
                ...volunteer,
                isMinor: moment().diff(volunteer.date_of_birth, "years") < 18,
                age: moment().diff(volunteer.date_of_birth, "years"),
              }))}
              title="SmileUp Volunteers"
              actions={[
                {
                  icon: Edit,
                  tooltip: "Edit Volunteer",
                  onClick: (event, rowData) => {
                    // console.log("THIS IS THE ROW DATA: ", rowData);
                    history.push(`/profile/${rowData.id}`);
                  },
                },
                {
                  icon: Add,
                  tooltip: "Add User",
                  isFreeAction: true,
                  onClick: (event) => alert("You want to add a new row"),
                },
              ]}
            />
          </div>
        </>
      ) : (
        <h1>You must be an admin to access this page.</h1>
      )}
    </>
  );
};

export default VolunteerDirectory;
