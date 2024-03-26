import { useState } from "react";
import { useAppContext } from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
    const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const {id, setId} = useAppContext()

  async function register(event) {
    event.preventDefault();

    if(name.length == 0) {
        toast.error('Please enter your name.', {
            position: "bottom-right",
            theme: "colored",
            });
    };
    if(pass.length == 0) {
        toast.error('Please enter your password.', {
            position: "bottom-right",
            theme: "colored",
            });
    }

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" ,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400"
      },
      body: JSON.stringify({
          name,
          password: pass
      })
    };
    if(name.length != 0 && pass.length != 0){
    const res = await fetch("http://localhost:80/user/register", settings);
    
    const body = await res.json();
    if (!res.ok) {
      toast.error(body.message, {
        position: "bottom-right",
        theme: "colored",
      });
    }
    toast.success(body.message, {
      position: "bottom-right",
      theme: "colored",
    });
    return body;
}
  }

  return (
    <div className="h-100 mt-10">
        <ToastContainer />
        <form method="post" onSubmit={register} className="grid mx-24 gap-5 h-56">
        <h1 className="text-xl font-bold">Register</h1>
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
        <input className="border-solid border-2 border-sky-500 cursor-pointer" type="submit" value="Register" />
        </form>
    </div>
  );
}