import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthentecated, setIsAuthentecated] = useState(false);
  const [loggedInUserIdx, setLoggedInUserIdx] = useState(null);
    const handleSubmit=(e)=>{
        e.preventDefault();


        let newArr=[]
        if(localStorage.getItem("users")){
         newArr=JSON.parse(localStorage.getItem("users"))
        }
        newArr.forEach((element,index)=>{
            if (element.username.toLowerCase() ===username.toLowerCase()) {
                setIsAuthentecated(true)
                setLoggedInUserIdx(index)
            }
        })
        
        
        
        
        
    }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {username.length<5&&<Form.Text className="text-muted">
            The username must be 5 characters at least
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
         {password.length<5&&<Form.Text className="text-muted">
            The password must be 5 characters at least
          </Form.Text>} 
        </Form.Group>
        
        {(username.length>=5&&password.length>=5)&&<Button variant="primary" type="submit">
          Login
        </Button>}
      </Form>
    </div>
  );
}

export default LoginForm;