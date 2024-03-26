import { useState } from "react";
import { useAppContext } from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const { id, setId } = useAppContext();
  const navigate = useNavigate()

  async function login(event) {
    event.preventDefault();

    if (name.length == 0) {
      toast.error("Please enter your name.", {
        position: "bottom-right",
        theme: "colored",
      });
    }
    if (pass.length == 0) {
      toast.error("Please enter your password.", {
        position: "bottom-right",
        theme: "colored",
      });
    }

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
      body: JSON.stringify({
        name,
        password: pass,
      }),
    };
    if (name.length != 0 && pass.length != 0) {
      const res = await fetch("http://localhost:80/user/login", settings);
      console.log(res)
      if (!res.ok) {
        toast.error("Name or Password is incorrect.", {
          position: "bottom-right",
          theme: "colored",
        });
      } else{
      const body = await res.json();
      localStorage.setItem("jwt", body.token);
      setId(body.userId);
      toast.success("Logged in.", {
        position: "bottom-right",
        theme: "colored",
      });
      
    navigate("/")
    }
  }
  }

  return (
    <div className="h-100 mt-10">
      <ToastContainer />
      <form method="post" onSubmit={login} className="grid mx-24 gap-5 h-56">
        <h1 className="text-xl font-bold">Login</h1>
        <input
        className="rounded-md px-4 text-black"
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
        className="rounded-md px-4 text-black"
          type="password"
          name="pass"
          value={pass}
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <input className="border-solid border-2 border-sky-500 cursor-pointer" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
