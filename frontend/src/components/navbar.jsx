import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/userContext";

export const Navbar = () => {
  const { id, setId } = useAppContext();
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate()

  async function logout() {
    localStorage.clear();
    setId("");
    navigate("/")
  }

  return (
    <div className="flex justify-between mx-3 mt-5">
      <Link to="/">Home</Link>
      <ul className="list-none flex gap-5">
        {(id && token) && <li><Link to="/post/create" className="hover:underline decoration-sky-500">Create</Link></li>}
        {(id && token) && <li><button onClick={logout} className="hover:underline decoration-sky-500">Logout</button></li>}
        {!id && <li><Link to="/login" className="hover:underline decoration-sky-500">Login</Link></li>}
        {!id && <li><Link to="/register" className="hover:underline decoration-sky-500">Register</Link></li>}
      </ul>
    </div>
  );
};
