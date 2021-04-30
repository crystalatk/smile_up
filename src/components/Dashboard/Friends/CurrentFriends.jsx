import { useState, useEffect } from "react";

const CurrentFriends = ({ userInfo }) => {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const friendListResponse = await fetch(
        `http://127.0.0.1:3232/guardians/friendslist?volunteer_id=${userInfo.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log(friendListResponse.rows);
      setFriendsList(friendListResponse.rows);
    };
    fetchList();
  }, []);
  return (
    <>
      <h1>These are my current friends</h1>
      {friendsList.map((friend) => {
        return (
          <>
            <h3>{friend.first_name}</h3>
            <img src={friend.avatar_link} width="300px" />
          </>
        );
      })}
    </>
  );
};
export default CurrentFriends;
