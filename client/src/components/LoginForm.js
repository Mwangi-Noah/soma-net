import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../api.js';

const LoginPage = () => {
  const history = useHistory();
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await api.login(username, password);
      if (response.status === 200) {
        history.push('/dashboard'); // Redirect to the dashboard or desired page upon successful login
      } else {
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Enter username" required />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter password" required />
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;