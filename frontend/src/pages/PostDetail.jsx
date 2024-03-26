import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const { id, setId } = useAppContext();
  let navigate = useNavigate();
  useEffect(() => {
    getData(postId);
  }, []);

  async function getData(postId) {
    const res = await fetch("http://localhost/posts/" + postId);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const body = await res.json();
    if (body.posts.length == 0) {
      return;
    }
    setPost(body.posts[0]);
  }

  async function deletePost() {
    const token = localStorage.getItem("jwt");
    const settings = {
      method: "DELETE",
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
        postId: parseInt(post.idpost),
        userId: parseInt(id),
      }),
    };
    const res = await fetch("http://localhost/posts/", settings);
    if (!res.ok) {
      toast.error("Something went wrong.", {
        position: "bottom-right",
        theme: "colored",
      });
    }
    const body = await res.json();
    toast.success("Post deleted successfully.", {
      position: "bottom-right",
      theme: "colored",
    });
    setTimeout(()=> {navigate("/")},800); 
  }

  return (
    <div className="h-100 m-10">
      <Link to="/" className="underline decoration-sky-500">Back</Link>
      <ToastContainer />
      {post != undefined ? (
        <>
          <div className="grid gap-10 mt-10">
            <h1 className="font-bold text-2xl">{post.title}</h1>
            <p>{post.content}</p>
          </div>
          <div className="flex w-auto justify-end mx-10 gap-5">
            {post.user_id == id && (
              <Link
                to={"/post/update/" + post.idpost}
                className="border-solid border-2 border-sky-500 p-2 disabled:border-gray-800"
              >
                Update
              </Link>
            )}
            {post.user_id == id && (
              <button
                className="border-solid border-2 border-sky-500 p-2 disabled:border-gray-800"
                onClick={deletePost}
              >
                Delete
              </button>
            )}
          </div>
        </>
      ) : (
        "No Detail"
      )}
    </div>
  );
};

export default PostDetail;
