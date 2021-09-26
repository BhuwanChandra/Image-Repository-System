import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../redux/actions";

const LoginForm = ({ visible, onLoginClick, onCancel, loading }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      centered
      visible={visible}
      title="User Login"
      confirmLoading={loading}
      okText="Login"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => onLoginClick(values))
          .then(res => form.resetFields())
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: false
        }}
        size="middle"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: "Please enter a valid Email!"
            }
          ]}
          hasFeedback
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter a valid Password!"
            },
            {
              required: true,
              min: 6,
              message: "Password shoul have minimum length of 6!"
            }
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Login = ({ loading, loginUser }) => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const onLoginClick = values => loginUser(values)
            .then(res => {
              setVisible(false);
              history.push('/dashboard');
            });

  return (
    <div>
      <Button
        style={{ padding: '0px 40px' }}
        size="large"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Login
      </Button>
      <LoginForm
        visible={visible}
        onLoginClick={onLoginClick}
        loading={loading}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user) => dispatch(loginUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
