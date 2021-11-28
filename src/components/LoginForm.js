import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let newArr = [];
    if (localStorage.getItem("users")) {
      newArr = JSON.parse(localStorage.getItem("users"));
    }
    newArr.forEach((element, index) => {
      if (
        element.username.toLowerCase() === username.toLowerCase() &&
        element.password.toLowerCase() === password.toLowerCase()
      ) {
        existFunc(element)
      }
    });
  }
  const existFunc=(user)=>{
    localStorage.setItem("currentUser",JSON.stringify(user))
    if (user.role==="admin") {
      navigate('/admin')
    }
    else{
      navigate('/blog')
    }
  }
  return (
    <div>

      <h1>Login Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmailLogin">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {username.length < 5 && (
            <Form.Text className="text-muted">
              The username must be 5 characters at least
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordLogin">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length < 5 && (
            <Form.Text className="text-muted">
              The password must be 5 characters at least
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group>
        <Link to="/register">Don't have an account?</Link>
        </Form.Group>

        {username.length >= 5 && password.length >= 5 ? (
          <Button variant="primary" type="submit">
            Login
          </Button>
        ) : (
          <Button variant="primary" type="submit" disabled>
            Login
          </Button>
        )}
      </Form>
    </div>
  );
}

export default LoginForm;
