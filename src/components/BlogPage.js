import React, { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Post from "./Post";

function BlogPage() {
  const navigate=useNavigate();
  const [postsArr, setPostsArr] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    let {posts}=localStorage;
    let {currentUser}=localStorage;
    if (posts &&currentUser) {
      let parsedPosts=JSON.parse(posts);
      let ParsedCurrentUser=JSON.parse(currentUser);
      setPostsArr(parsedPosts)
      setCurrentUser(ParsedCurrentUser)
    }
    else{
      navigate('/login')
    }
    
  }, [])
  const logoutFunc= ()=>{
    localStorage.removeItem("currentUser")
    navigate("/login")
  }
  return (
    <div>
        <button onClick={logoutFunc}>logout</button>
      {
        postsArr.map((data,index)=><Post key={index} index={index} blogData={data} role={currentUser.role}/>)
      }
    </div>
  );
}

export default BlogPage;
