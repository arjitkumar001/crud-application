import {
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { apiUrl } from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [userData, setUserData] = useState([]);
  console.log("userData", userData);
  const token = localStorage.getItem("Authentication");

  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}contacts/getAllContacts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response====", response);
      if (response.status === 200) {
        //   setUserData(response.data);
        console.log("Users retrieved successfully", response.data);
      } else {
        console.log("Error during get users:");
      }
    } catch (error) {
      console.error("Error during get user:", error);
    }
  };

  //   useEffect(() => {
  //     getUsers();
  //   }, []);

  const userHeader = ["User Name", "User Email", "User Mobile", "Actions"];

  return (
    <Box>
      <Heading textAlign={"center"}>UserList</Heading>

      <Button onClick={getUsers}>get user</Button>
      <Divider />
      <Box mt={2}>
        <TableContainer
          border={"1px solid white"}
          sx={{ borderRadius: "10px" }}
        >
          <Table>
            <Thead>
              <Tr>
                {userHeader.map((val) => (
                  <Th>{val}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Gopal</Td>
                <Td>gopal123@gmail.com</Td>
                <Td>9999999</Td>
                <Td sx={{ display: "flex", gap: "5px" }}>
                  <IconButton
                    variant="solid"
                    colorScheme="red"
                    aria-label="Delete"
                    fontSize="20"
                    icon={<MdDeleteOutline />}
                    //   onClick={() => handleDeleteItem(item.id)}
                  />
                  <IconButton
                    variant="solid"
                    colorScheme="teal"
                    aria-label="Edit"
                    fontSize="20px"
                    icon={<MdEdit />}
                    //   onClick={() => handleItemChange(item.id)}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
export default UserList;
