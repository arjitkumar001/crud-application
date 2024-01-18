import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiUrl } from "../../config";
const token = localStorage.getItem("Authentication");

function UserForm({ getUsers, selectedUser, setSelectedUser }) {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    if (selectedUser) {
      setUserDetail({
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
      });
    } else {
      // Reset form fields if no user is selected
      setUserDetail({
        name: "",
        email: "",
        phone: "",
      });
    }
  }, [selectedUser]);
  const addUserUrl = async () => {
    try {
      if (selectedUser) {
        const response = await fetch(
          `${apiUrl}contacts/updateContact/${selectedUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userDetail),
          }
        );
        console.log("User updated successfully", response);
      } else {
        // If no selectedUser, it means we are creating a new user
        const response = await fetch(`${apiUrl}contacts/createContact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userDetail),
        });
        console.log("User created successfully", response);
      }

      getUsers();
      setSelectedUser(null);
      setUserDetail({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.log("Error during add/update user:", error);
    }
  };

  const addUser = (event) => {
    event.preventDefault();
    addUserUrl();
  };
  const cancelEditUser = () => {
    setSelectedUser(null);
    setUserDetail({
      name: "",
      email: "",
      phone: "",
    });
  };
  return (
    <>
      <Box sx={{ width: "90%" }}>
        <Heading textAlign={"center"} mb={5}>
          Add Users
        </Heading>
        <Divider />
        <Box>
          <form onSubmit={addUser}>
            <FormControl>
              <FormLabel>User Name:</FormLabel>
              <Input
                value={userDetail.name}
                type="text"
                placeholder="Enter user name"
                onChange={(e) =>
                  setUserDetail({ ...userDetail, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>User Email:</FormLabel>
              <Input
                value={userDetail.email}
                type="email"
                placeholder="Enter user email"
                onChange={(e) =>
                  setUserDetail({ ...userDetail, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>User Mobile:</FormLabel>
              <Input
                value={userDetail.phone}
                type="text"
                placeholder="Enter mobile no."
                onChange={(e) =>
                  setUserDetail({ ...userDetail, phone: e.target.value })
                }
              />
            </FormControl>
            <Stack spacing={4} direction="row" align="center">
              <Button
                onClick={addUser}
                w="full"
                mt={4}
                variant="solid"
                colorScheme="red"
              >
                {selectedUser ? "Update User" : "Add User"}
              </Button>
              {selectedUser && (
                <Button
                  onClick={cancelEditUser}
                  w="full"
                  mt={4}
                  variant="outline"
                  colorScheme="yellow"
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
}
export default UserForm;
