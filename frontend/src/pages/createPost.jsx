
import { useEffect, useState } from "react";
import { useAppContext } from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";



export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id, setId } = useAppContext();
  const navigate = useNavigate()

  useEffect(() => {
    if(id.length == 0) {
      navigate("/login")
    }
  }, []);

  async function createPost(event) {
    event.preventDefault();

    if(title.length == 0) {
      toast.error('Please enter a title.', {
          position: "bottom-right",
          theme: "colored",
          });
  };
  if(content.length == 0) {
      toast.error('Please enter a content.', {
          position: "bottom-right",
          theme: "colored",
          });
  }

    const token = localStorage.getItem('jwt')
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Access-Control-Allow-Origin": "*" ,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400"
      },
      body: JSON.stringify({
          title,
          content,
          userId: parseInt(id)
      })
    };
    if(title.length != 0 && content.length != 0){
    const res = await fetch("http://localhost:80/posts/create", settings);
    if (!res.ok) {
      toast.error("Something went wrong.", {
        position: "bottom-right",
        theme: "colored",
      });
    } else {
    const body = await res.json();
    toast.success("Post created successfully.", {
      position: "bottom-right",
      theme: "colored",
    });
    return body;
  }
  }
  }


  return (
    <div className="h-100 mt-10">
      <ToastContainer />
        <form method="post" onSubmit={createPost} className="grid mx-24 gap-5 h-56">
      <Link to={'/'} className="underline decoration-sky-500">Back</Link>
        <h1 className="text-3xl font-bold">Create Post</h1>
        <input
        className="rounded-sm px-4 text-black"
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
        className="rounded-sm px-4 text-black" placeholder="Content" rows={4} cols={50} onChange={(e) => setContent(e.target.value)} value={content}></textarea>
        <input className="p-3 border-solid border-2 border-sky-500 cursor-pointer" type="submit" value="Post" />
        </form>
    </div>
  );
}
