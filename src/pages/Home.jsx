import React,{useState,useEffect} from "react";
import Navbar from "../../components/Navbar";
import apiBase from "../utils/apiBase";
import PostGrid from "../../components/PostGrid";
import axios from "axios";


function Home(){
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    const fetchposts= async() => {
    try {
      const res = await axios.get(`${apiBase}/api/posts`);
      setPosts(res.data);
      console.log(res.data);
    } catch (error) {
         console.error("Failed to fetch posts:", error);
    }
    };
    fetchposts();
  },[]);

 
  return (
    <>
  <Navbar />
  <div class="container mb-5">
    <div class="position-relative p-0  text-muted bg-body">
      <h3 class="text-body-emphasis">Your Posts</h3>
      <p class="col-lg-6  mb-4">
       Create and Manage your posts.
      </p>
    </div>
  </div>
{posts.length === 0 ? (
  <p>There aren't any posts at the moment</p>
) : (
  <PostGrid posts={posts} />
)}

      </>
  );

}

export default Home;