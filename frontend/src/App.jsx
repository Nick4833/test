import { useEffect, useLayoutEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [pageAmount, setPageAmount] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    getTotal();
    console.log(pageAmount);
    getData();
  }, [, page]);

  async function getTotal() {
    const res = await fetch("http://localhost:80/posts/total");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const body = await res.json();
    const pageAmount = Math.floor(body.total / 10);
    console.log(pageAmount);
    setPageAmount(pageAmount);
  }

  async function getData() {
    const res = await fetch("http://localhost:80/posts?page=" + page, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const body = await res.json();

    setPosts(body);
    console.log(body);
  }

  return (
    <>
      <div className="h-100 mt-10">
        {posts.posts != undefined
          ? posts.posts.map((post) => (
              <Link key={post.idpost} to={"post/" + post.idpost}>
                <div className="m-10">
                  <h2 className="ttext-xl font-bold">{post.title}</h2>
                  <p className="truncate w-36">{post.content}</p>
                </div>
              </Link>
            ))
          : "No Posts"}
        <div className="flex w-auto justify-end mx-10 gap-5">
        <button
        className="border-solid border-2 border-sky-500 p-2 disabled:border-gray-800"
          disabled={page == 0}
          onClick={() => {
            if (page < 0) {
              setPage(0);
            } else {
              setPage(page - 1);
            }
          }}
        >
          Prev
        </button>
        <button
        className="border-solid border-2 border-sky-500 p-2 disabled:border-gray-800"
          disabled={page == pageAmount}
          onClick={() => {
            if (page == pageAmount) {
              setPage(pageAmount);
            } else {
              setPage(page + 1);
            }
          }}
        >
          Next
        </button>
        </div>
      </div>
    </>
  );
}

export default App;
