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
import { useMyContext } from "../Context";
import { useHistory, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const history = useHistory();
  const { loginUrl, userLogin, setUserLogin, isLogin } = useMyContext();
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = async (event) => {
    event.preventDefault();

    let isValid = true;
    const newErrors = { email: "", password: "" };
    if (!userLogin.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!userLogin.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) {
      loginUrl();
    }
  };
  useEffect(() => {
    if (isLogin === true) {
      history.push("/dashboard");
    }
  }, [isLogin === true]);
  return (
    <>
      <Box
        className="login-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "40%",
            borderRadius: "10px",
            background: "rgba(56, 43, 43,0.4)",
            padding: "20px",
          }}
        >
          <Heading mb={2} as="h2" size="lg" sx={{ textAlign: "center" }}>
            User Login
          </Heading>
          <Divider />
          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>Email address:</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={userLogin.email}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, email: e.target.value })
                }
              />
              <Text color="red" fontSize="12px">
                {errors.email}
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={userLogin.password}
                onChange={(e) =>
                  setUserLogin({ ...userLogin, password: e.target.value })
                }
              />
              <Text color="red" fontSize="12px">
                {errors.password}
              </Text>
            </FormControl>
            <Button
              mt={4}
              size="sm"
              w="full"
              variant="solid"
              colorScheme="teal"
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
          <Text
            sx={{ textAlign: "center", fontsize: "12px", color: "black" }}
            mt={4}
          >
            Don't have an account{" "}
            <NavLink to="/" style={{ color: "blue", fontWeight: "500" }}>
              <u>SIGN UP</u>
            </NavLink>
          </Text>
        </Box>
      </Box>
    </>
  );
}
