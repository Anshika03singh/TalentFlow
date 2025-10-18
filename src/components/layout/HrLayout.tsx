import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const HrLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast("Logged out successfully");
    navigate("/login");
  };

  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">TalentFlow HR Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default HrLayout;

