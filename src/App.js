import "./App.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { MyContextProvider } from "./Components/Context";
import RegisterUser from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";

function App() {
  return (
    <ChakraProvider>
      <MyContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={RegisterUser} />
            <Route path="/login" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/home" exact component={Home} />
          </Switch>
        </Router>
      </MyContextProvider>
    </ChakraProvider>
  );
}

export default App;
