import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/auth.slice";
import { IoClose, IoMenu } from "react-icons/io5";
function Navbar() {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  const data = useSelector((state) => state?.auth?.data);
  const user=data
  async function handleLogOut(e) {
    e.preventDefault();
    const response = await dispatch(logout());
    if (response?.payload?.success) {
      navigate("/");
    }

  }
  return (
    <header>
      <nav className="container flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <Link to={"/"} className="text-2xl font-extrabold text-black">
          DOTNOTE
        </Link>
        <button
          className="h-9 w-9 md:hidden flex items-center justify-center shadow-sm rounded-full transition-colors ease-in-out text-black border border-gray-200 hover:bg-gray-50"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
        <div className={`menu ${menu ? "active" : ""}`}>
          <div className="flex md:flex-row flex-col item-center">
            <Link to={"/"} className="nav_link">
              Home
            </Link>
            <Link to={"/notes"} className="nav_link">
              Notes
            </Link>
            <Link to={"/about"} className="nav_link">
              About us
            </Link>
            <Link to={"/contact"} className="nav_link">
              Contact us
            </Link>
            {isLoggedIn && role === "ADMIN" && (
              <Link to={"/admin"} className="nav_link">
                Admin Panel
              </Link>
            )}
            {isLoggedIn && (
              <>
                <Link to={"/profile"} className="nav_link capitalize">
                  {user.userName.split(" ")[0]}
                </Link>
                <span
                  className="nav_link cursor-pointer"
                  onClick={handleLogOut}
                >
                  Log Out
                </span>
              </>
            )}
            {!isLoggedIn && (
              <Link to={"/login"} className="nav_btn">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
