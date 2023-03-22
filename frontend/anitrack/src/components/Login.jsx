import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

import './Login.css';

const Login = () => {
  const BASE_URL = `https://anime-list-service.onrender.com/api`;
  const [message, setMessage] = useState('');

  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      const response = await axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password,
  
      });
      if (response.status === 200) {
        setMessage('Login successful');
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <h5>Login</h5>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
      
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        {message && <p className="message">{message}</p>}
      </Form>
    </div>
  );
};

export default Login;
