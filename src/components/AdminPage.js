import React, { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Post from "./Post";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function AdminPage() {
  const navigate = useNavigate();
  const [postsArr, setPostsArr] = useState([]);
  const [postText,setPostText]=useState("");
  const [storageData,setStorageData]=useState([])
  useEffect(() => {
    let {users}=localStorage;
    let {currentUser}=localStorage;
    if (users&&currentUser) {
      let currentUserData= JSON.parse(currentUser)
      if (currentUserData.role=="admin") {
        console.log("welcome Admin")
      }
      else {
        navigate("/login")
      }
    }
    else{
      navigate("/login")
    }
    let storageData=JSON.parse(localStorage.getItem("posts"))
    if(storageData){
      setPostsArr(storageData)
    }
    else{
      localStorage.setItem("posts",JSON.stringify([]))
    }
    
  }, []);
  const handleSubmit=async(e)=>{
    e.preventDefault()
    let newPostObj={
      postText:postText,
      likes:[],
      comments:[]
    }
    await setPostsArr([...postsArr,newPostObj])
    
    localStorage.setItem("posts",JSON.stringify([...postsArr,newPostObj]))
  }
  const handleDelete= (index)=>{
    let newArr=postsArr;
    newArr.splice(index,1)
    setPostsArr([...newArr])
    localStorage.setItem("posts",JSON.stringify([...newArr]))
  }
  
  const logoutFunc= ()=>{
    localStorage.removeItem("currentUser")
    navigate("/login")
  }
  return (
    <div>
      <button onClick={logoutFunc}>Logout</button>
      <Form onSubmit={handleSubmit}>
        <h3>Add new post</h3>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Post Text</Form.Label>
          <Form.Control type="text" placeholder="text"  onChange={(e)=>setPostText(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Post
        </Button>
      </Form>

      {postsArr.map((data,index) => (
        <Post key={index} index={index} blogData={data} deleteFunc={handleDelete}/>
      ))}
    </div>
  );
}

export default AdminPage;
