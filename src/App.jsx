import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import Home from "./home";
import User from "./user";
import AuthProvider from "./Authcontex";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/user/:id" element={<User />}></Route>
      </Routes>
    </Router>
  );
};

const continar = document.getElementById("root");
const root = createRoot(continar);
root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
