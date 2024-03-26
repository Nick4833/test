import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";

export const UpdatePost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState([]);

  const { id, setId } = useAppContext();
  const navigate = useNavigate()
  useEffect(() => {
    getData(id);
  }, []);

  useEffect(() => {
    if(id.length == 0) {
      navigate("/login")
    }
  }, []);
  
  async function getData(id) {
    const res = await fetch("http://localhost/posts/" + postId);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const body = await res.json();
    if (body.posts.length == 0) {
      alert('post not founf')
    }
    setPost(body.posts[0]);
    setTitle(body.posts[0].title)
    setContent(body.posts[0].content)
  }

  async function updatePost(event) {
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

    const token = localStorage.getItem("jwt");
    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
      body: JSON.stringify({
        title,
        content,
        postId: parseInt(postId),
        userId: parseInt(id),
      }),
    };
    if(title.length != 0 && content.length != 0){
    const res = await fetch("http://localhost:80/posts/update", settings);
    if (!res.ok) {
      toast.error("Something went wrong.", {
        position: "bottom-right",
        theme: "colored",
      });
    } else {
    const body = await res.json();
    toast.success("Post updated successfully.", {
      position: "bottom-right",
      theme: "colored",
    });
    navigate("/post/" + postId)
  }
  }
  }

  return (
    <div className="h-100 m-10">
      
      <Link to={'/post/' + postId} className="underline decoration-sky-500">Back</Link>
      <ToastContainer />
      {post != undefined || post.userId != id ? (
        <form method="post" onSubmit={updatePost} className="grid mx-24 gap-5 h-56 mt-10">
          <h1 className="text-3xl font-bold">Update Post</h1>
          <input
        className="rounded-sm px-4 text-black"
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
          className="rounded-sm px-4 text-black"
            rows={4}
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            value={content}
          ></textarea>
          <input className="p-3 border-solid border-2 border-sky-500 cursor-pointer"  type="submit" value="Post" />
        </form>
      ) : (
        "Post not found"
      )}
    </div>
  );
};
