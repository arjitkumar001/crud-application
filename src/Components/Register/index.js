import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { apiUrl } from "../../config";
import { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";

export default function RegisterUser() {
  const history = useHistory();
  const [userDetail, setUserDetail] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ username: "", email: "", password: "" });
  const handleRegister = async (event) => {
    event.preventDefault();
    let isValid = true;
    const newErrors = { username: "", email: "", password: "" };
    if (!userDetail.username) {
      newErrors.username = "username is required";
      isValid = false;
    }
    if (!userDetail.email) {
      newErrors.email = "email is required";
      isValid = false;
    }
    if (!userDetail.password) {
      newErrors.password = "passowrd is required";
      isValid = false;
    }
    setError(newErrors);
    if (isValid) {
      try {
        const response = await fetch(`${apiUrl}users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetail),
        });
        if (response.ok) {
          history.push("/login");
          setUserDetail({
            username: "",
            email: "",
            password: "",
          });
        }
        console.log("User Registered successfully", response);
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };
  return (
    <>
      <Box
        className="register-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "40%",
            borderRadius: "10px",
            background: "rgba(255, 255, 255,0.2)",
            padding: "20px",
          }}
        >
          <Heading mb={2} as="h2" size="lg" sx={{ textAlign: "center" }}>
            Registration
          </Heading>
          <Divider />
          <form onSubmit={handleRegister}>
            <FormControl>
              <FormLabel>User Name:</FormLabel>
              <Input
                type="text"
                value={userDetail.username}
                onChange={(e) =>
                  setUserDetail({ ...userDetail, username: e.target.value })
                }
                placeholder="Enter your name"
              />
              <Text color="red" fontSize="12px">
                {error.username}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>Email address:</FormLabel>
              <Input
                type="email"
                value={userDetail.email}
                onChange={(e) =>
                  setUserDetail({ ...userDetail, email: e.target.value })
                }
                placeholder="Enter your email"
              />
              <Text color="red" fontSize="12px">
                {error.email}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                value={userDetail.password}
                onChange={(e) =>
                  setUserDetail({ ...userDetail, password: e.target.value })
                }
                placeholder="Enter your email"
              />
              <Text color="red" fontSize="12px">
                {error.password}
              </Text>
            </FormControl>
            <Button
              mt={4}
              size="sm"
              w="full"
              variant="solid"
              colorScheme="yellow"
              onClick={handleRegister}
            >
              Register
            </Button>
          </form>
          <Text
            sx={{ textAlign: "center", fontsize: "12px", color: "#fff" }}
            mt={4}
          >
            Already registered{" "}
            <NavLink to="/login" style={{ color: "blue", fontWeight: "500" }}>
              <u>LOGIN</u>
            </NavLink>
          </Text>
        </Box>
      </Box>
    </>
  );
}
