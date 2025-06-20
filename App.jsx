import { useState } from 'react';
import CreatePost from './src/pages/CreatePost';
import Home from './src/pages/Home';

import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import './App.css'
import PostCardDetails from './src/pages/PostCard';
import EditPost from './src/pages/EditPost';

function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/create" element={<CreatePost />}/>
     <Route path="/post/:id" element={<PostCardDetails />} />
     <Route path="/edit/:id" element={<EditPost />} />
   </Routes> 
   </BrowserRouter>
  )
}

export default App;
