import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const BASE_URL = `http://anime-list-service.onrender.com/api/`
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [message, setMessage] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };    

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      username: username,
      email: email,
      password: password,
      birthdate: birthdate || "01/01/2000",
      message: message
    });
    if (response.status === 200) {
      setUsername("");
      setEmail("");
    } else {
      setMessage("Some error occured");
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Birthdate:
          <input type="date" value={birthdate} onChange={handleBirthdateChange} />
        </label>
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
