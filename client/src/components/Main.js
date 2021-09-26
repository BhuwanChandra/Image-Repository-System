import { Layout } from "antd";
import React from "react";
import Login from "./Login";
import SignUp from "./Signup";

const Main = () => {
  const { Content } = Layout;
  return (
    <Content style={{ height: "82%", display: "flex" }}>
      <div style={authStyles}>
        <Login />
        <SignUp />
      </div>
    </Content>
  );
};

const authStyles = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  justifyContent: "space-evenly",
  width: "50%",
  margin: "auto"
};

export default Main;

