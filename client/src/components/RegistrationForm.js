import React, { useState } from 'react';
import { Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationForm = ({ onLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState([]);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
  
    if (password !== passwordConfirmation) {
      setErrors(["Password confirmation does not match."]);
      return;
    }
  
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        password,
        email,
        location,        
      }),
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((user) => onLogin(user))
            .then(navigate('/'));
        } else {
          response.json().then((err) => setErrors(err.errors || [err.error]));
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      {errors.map((error, index) => (
        <Alert key={index} variant="danger">
          {error}
        </Alert>
      ))}
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="passwordConfirmation">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegistrationForm;