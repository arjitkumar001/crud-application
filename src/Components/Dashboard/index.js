import React from "react";
import NavBar from "../Common/Navbar";
import { Grid, GridItem } from "@chakra-ui/react";
import UserForm from "../Crud/userForm";
import UserList from "../Crud/userList";
function Dashboard() {
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
            height: "92vh",
            background: "lightgray",
          }}
        >
          <UserForm />
        </GridItem>
        <GridItem
          bg={"green"}
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "92vh",
            background: "rgba(211,211,211,.5)",
          }}
        >
          <UserList />
        </GridItem>
      </Grid>
    </>
  );
}
export default Dashboard;
