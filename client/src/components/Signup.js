import React, { useState } from "react";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions";
import { Form, Input, Button, Modal } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const SignUpForm = ({ visible, onSignUpClick, onCancel, loading }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      centered
      visible={visible}
      title="User SignUp"
      confirmLoading={loading}
      okText="SignUp"
      cancelText="Cancel"
      onCancel={() => {form.resetFields();onCancel();}}
      onOk={() => {
        form
          .validateFields()
          .then(values => onSignUpClick(values))
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
          name="name"
          label="UserName"
          rules={[
            {
              required: true,
              message: "Please enter your Username!"
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
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
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('confirm password should match with password!');
              },
            }),
          ]}
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

const SignUp = ({ loading, signupUser }) => {
  const [visible, setVisible] = useState(false);

  const onSignUpClick = values => signupUser(values)
          .then(res => setVisible(false));

  return (
    <div>
      <Button
      style={{padding: '0px 40px'}}
        size="large"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        SignUp
      </Button>
      <SignUpForm
        visible={visible}
        onSignUpClick={onSignUpClick}
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
    signupUser: (user) => dispatch(signupUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
