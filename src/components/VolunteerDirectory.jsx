import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VolunteerDirectory = ({ userInfo }) => {
  const [volunteersData, setVolunteersData] = useState([]);

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
      {userInfo.isAdmin || true ? (
        <>
          <h1>This is the Volunteer Directory</h1>
          <ul>
            {volunteersData.map((volunteer) => {
              return (
                <Link to={`/profile/${volunteer.id}`}>
                  <li key={volunteer.id}>
                    <h1>
                      {volunteer.first_name} {volunteer.last_name}
                    </h1>
                  </li>
                </Link>
              );
            })}
          </ul>
        </>
      ) : (
        <h1>You must be an admin to access this page.</h1>
      )}
    </>
  );
};

export default VolunteerDirectory;
