import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [adminId, setAdminId] = useState("null");
  const [role, setRole] = useState("user");
  const [users] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    class User {
      constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
      }
    }

    let newArr = users;
    if (localStorage.getItem("users")) {
      newArr = JSON.parse(localStorage.getItem("users"));
    }
    let exist = false;
    newArr.forEach((element) => {
      if (element.username.toLowerCase() === username.toLowerCase()) {
        exist = true;
      }
    });
    if (!exist) {
      let newUser = new User(username, password, role);
      newArr.push(newUser);
      localStorage.setItem("users", JSON.stringify(newArr));
      alert("you have registered successfully ");
    } else {
      alert("you are a member please sign in");
    }
  };
  return (
    <div>
      <h1>Register Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Register As :</Form.Label>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmailRegister">
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

        <Form.Group className="mb-3" controlId="formBasicPasswordRegister">
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
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          {password !== password2 && (
            <Form.Text className="text-muted">
              The two password should match
            </Form.Text>
          )}
        </Form.Group>
        {role === "admin" && (
          <Form.Group className="mb-3" controlId="formBasicAdminId">
            <Form.Label>Admin Id</Form.Label>
            <Form.Control
              type="password"
              placeholder="****"
              onChange={(e) => setAdminId(e.target.value)}
            />
            {adminId.length !== 4 && (
              <Form.Text className="text-muted">
                The Admin Id should be just 4 characters
              </Form.Text>
            )}
          </Form.Group>
        )}
        <Form.Group>
          <Link to="/login">have an account?</Link>
        </Form.Group>

        {role === "admin" ? (
          adminId.length === 4 &&
          adminId === "1234" &&
          password === password2 &&
          password.length >= 5 &&
          username.length >= 5 ? (
            <Button variant="primary" type="submit">
              Register
            </Button>
          ) : (
            <Button variant="primary" type="submit" disabled>
              Register
            </Button>
          )
        ) : password === password2 &&
          password.length >= 5 &&
          username.length >= 5 ? (
          <Button variant="primary" type="submit">
            Register
          </Button>
        ) : (
          <Button variant="primary" type="submit" disabled>
            Register
          </Button>
        )}
      </Form>
    </div>
  );
}

export default RegisterForm;
