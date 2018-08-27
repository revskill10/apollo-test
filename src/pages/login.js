import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import { Row, Col } from 'antd';

const LoginPage = () => (
  <Row>
    <style>{`
    .login-form {
      max-width: 300px;
    }
    .login-form-forgot {
      float: right;
    }
    .login-form-button {
      width: 100%;
    }
    `}</style>
    <Col span={3}></Col>
    <Col span={6}><LoginForm /></Col>
    <Col span={3}></Col>
    <Col span={2}></Col>
    <Col span={8}>
      <RegisterForm />
    </Col>
    <Col span={2}></Col>
  </Row>
)

export default LoginPage;