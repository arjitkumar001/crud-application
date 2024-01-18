import React, { useState } from "react";
import NavBar from "../Common/Navbar";
import { Grid, GridItem } from "@chakra-ui/react";
import UserForm from "../Crud/userForm";
import UserList from "../Crud/userList";
import axios from "axios";
import { apiUrl } from "../../config";
function Dashboard() {
  const token = localStorage.getItem("Authentication");
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}contacts/getAllContacts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        setUserData(response.data.data);
        console.log("Users retrieved successfully", response.data);
      } else {
        console.log("Error during get users:");
      }
    } catch (error) {
      console.error("Error during get user:", error);
    }
  };

  const handleUpdateUser = async (_id) => {
    try {
      const response = await axios.put(
        `${apiUrl}contacts/updateContact/${_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log("User updated successfully", response);
    } catch (error) {
      console.error("Error during get user:", error);
    }
  };

  return (
    <>
      <NavBar />
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem
          px={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "94vh",
            background: "lightgray",
          }}
        >
          <UserForm
            getUsers={getUsers}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        </GridItem>
        <GridItem
          bg={"green"}
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "94vh",
            background: "rgba(211,211,211,.5)",
          }}
        >
          <UserList
            userData={userData}
            setUserData={setUserData}
            getUsers={getUsers}
            handleUpdateUser={handleUpdateUser}
            setSelectedUser={setSelectedUser}
          />
        </GridItem>
      </Grid>
    </>
  );
}
export default Dashboard;
