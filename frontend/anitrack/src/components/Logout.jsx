import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import '../components/Logout.css'

const Logout = () => {
  const BASE_URL = `https://anime-list-service.onrender.com/api`;
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/logout`);
      if (response.status === 200) {
        setMessage('Logout successful');
      } else {
        setMessage('Logout failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Logout;