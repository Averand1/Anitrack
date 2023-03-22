import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import '../components/Signup.css'
import axios from 'axios';

const Signup = () => {
  const BASE_URL = `https://anime-list-service.onrender.com/api`
  const [message, setMessage] = useState('')

  const onFinish = async (values) => {
    try {
      const { username, email, password, birthdate } = values;
      const [year, day, month] = birthdate.split("-");
      const formattedDate = `${month}/${day}/${year}`;
      const response = await axios.post(`${BASE_URL}/signup`, {
        username: username,
        email: email,
        password: password,
        birthdate: formattedDate || "01/01/2000",
        message: message
      });
      if (response.status === 200) {
        setMessage('User creaeted Succesfully')
      } else {
        setMessage("Some error occured");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='signup-container'>
      <h5>Sign up</h5>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
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

        <Form.Item
          label="Birthdate"
          name="birthdate"
          rules={[{ required: true, message: 'Please select your birthdate!' }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
