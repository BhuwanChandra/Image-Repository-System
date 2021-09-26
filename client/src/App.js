import { FacebookFilled, InstagramFilled, TwitterCircleFilled, YoutubeFilled } from "@ant-design/icons";
import { Layout, Typography } from "antd";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./components/Routing";
import store from "./redux/store";

function App() {
  const { Header, Footer } = Layout;
  const { Title } = Typography;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              padding: 10,
              height: "8%",
              backgroundColor: "#5c1b77",
              justifyContent: "center"
            }}
          >
            <Title style={{ color: "#fff" }} level={3}>
              Auth-System
            </Title>
          </Header>
          <Layout>
            <Routing />
            <Footer
              style={{
                backgroundColor: "#c6cdff",
                height: "10%",
                textAlign: "center"
              }}
            >
              <div className="social-container">
                <FacebookFilled className="social-icon" />
                <InstagramFilled className="social-icon" />
                <TwitterCircleFilled className="social-icon" />
                <YoutubeFilled className="social-icon" />
              </div>
              &#169;Auth-System - 2020
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
