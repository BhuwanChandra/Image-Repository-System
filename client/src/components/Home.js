import { Button, Card, Layout, Spin } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import coverImage from "../programming-girl.svg";
import { getDetails, logoutUser } from "../redux/actions";

const styleCard = {
  width: "fit-content",
  height: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch"
};

const Home = ({ logout, getDetails, details }) => {
  const history = useHistory();
  const { Content } = Layout;
  const { Meta } = Card;

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Content style={{ height: "82%", display: "flex" }}>
      {!details.name ? (
        <div style={styleCard}>
          <Spin tip="Loading..." />
        </div>
      ) : (
        <div style={styleCard}>
          <Card
            style={{ minWidth: 300, maxWidth: 500 }}
            cover={<img alt="example" src={coverImage} />}
          >
            <Meta
              title={`Hello, ${details.name}`}
              description="Welcome in the world of programming!!"
            />
          </Card>
          <Button
            style={{ marginTop: "20px" }}
            danger
            onClick={() => {
              logout();
              history.push("/authenticate");
            }}
          >
            LogOut
          </Button>
        </div>
      )}
    </Content>
  );
};

const mapStateToProps = state => {
  return {
    details: state.details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser()),
    getDetails: () => dispatch(getDetails())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
