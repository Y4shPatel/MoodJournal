import { Link, useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";

const Navbar = () => {
  const { loggedIn, logout } = authStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Mood Journal
      </Link>
      <div className="space-x-4">
        {loggedIn && (
          <>
            <Link to="/moods" className="hover:underline">
              My Moods
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
