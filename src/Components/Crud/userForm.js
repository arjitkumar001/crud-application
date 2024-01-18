import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { apiUrl } from "../../config";
const token = localStorage.getItem("Authentication");

function UserForm() {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const addUserUrl = async () => {
    try {
      const response = await fetch(`${apiUrl}contacts/createContact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userDetail),
      });
      console.log("user create successfully", response);
    } catch (error) {
      console.log("Error during add user:", error);
    }
  };
  const addUser = (event) => {
    event.preventDefault();
    addUserUrl();
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
        <Divider/>
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
            <Button
              onClick={addUser}
              w="full"
              mt={4}
              variant="solid"
              colorScheme="red"
            >
              Add User
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
export default UserForm;
