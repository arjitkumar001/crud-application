import { Box, Button, Grid, GridItem, List } from "@chakra-ui/react";
import { Link ,useHistory} from "react-router-dom";
import { useMyContext } from "../../Context";

function NavBar() {
  const history = useHistory();
  const { setIsLogin } = useMyContext();
  const token = localStorage.getItem("Authentication");

  const handleLogOut = () => {
    localStorage.removeItem("Authentication", token);
    setIsLogin(false);
    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };
  return (
    <>
      <Box
        sx={{
          background: "#262626",
          position: "sticky",
          top: "0px",
          left: "0px",
          zIndex: "10000",
        }}
      >
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem colSpan={2} px={4}>
            <List color="#fff">
              <Link to="/home">Home</Link>
            </List>
            <List color="#fff">
              <Link to="/about">About</Link>
            </List>
          </GridItem>
          <GridItem
            colStart={4}
            px={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Button
              variant="solid"
              colorScheme="red"
              size="sm"
              onClick={handleLogOut}
            >
            Log Out
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
export default NavBar;
