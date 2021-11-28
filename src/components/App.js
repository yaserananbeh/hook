import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { Routes,Route } from "react-router-dom";
import BlogPage from "./BlogPage";
import AdminPage from "./AdminPage";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/blog" element={<BlogPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
