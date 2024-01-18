import { useEffect } from "react";
import {
  Box,
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
import axios from "axios";

function UserList({ userData, getUsers, handleUpdateUser, setSelectedUser }) {
  const token = localStorage.getItem("Authentication");

  useEffect(() => {
    getUsers();
  }, []);
  const handleDeleteUser = async (_id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}contacts/deleteContact/${_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log("User deleted successfully", response);
      getUsers();
    } catch (error) {
      console.error("Error during get user:", error);
    }
  };

  const userHeader = ["User Name", "User Email", "User Mobile", "Actions"];

  return (
    <Box>
      <Heading textAlign={"center"}>UserList</Heading>
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
              {userData.map((val) => (
                <Tr key={val._id}>
                  <Td>{val.name}</Td>
                  <Td>{val.email}</Td>
                  <Td>{val.phone}</Td>
                  <Td sx={{ display: "flex", gap: "5px" }}>
                    <IconButton
                      variant="solid"
                      colorScheme="red"
                      aria-label="Delete"
                      fontSize="20"
                      icon={<MdDeleteOutline />}
                      onClick={() => handleDeleteUser(val._id)}
                    />
                    <IconButton
                      variant="solid"
                      colorScheme="teal"
                      aria-label="Edit"
                      fontSize="20px"
                      icon={<MdEdit />}
                      onClick={() =>
                        setSelectedUser({
                          id: val._id,
                          name: val.name,
                          email: val.email,
                          phone: val.phone,
                        })
                      }
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
export default UserList;
