import { BiDoorOpen } from "react-icons/bi";
import { navSections } from "../constants";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Nav = ({ user }) => {
  return (
    <div className="flex flex-col justify-between items-end px-2 py-4">
      <div>
        <img className="w-14 mb-4" src="x-logo.webp" />
        {navSections.map((data, index) => (
          <div
            key={index}
            className="flex justify-center md:justify-normal items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer transition rounded-lg hover:bg-[#505050b7]"
          >
            {data.icon}
            <span className="max-md:hidden whitespace-nowrap">
              {data.title}
            </span>
          </div>
        ))}
      </div>
      <div>
        {!user ? (
          <div className="w-12 h-12 bg-white rounded-full animate-bounce"></div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <img src={user?.photoURL} className="w-12 h-12 rounded-full" />
              <p className="max-md:hidden">{user?.displayName}</p>
            </div>
            <button
              onClick={() => signOut(auth)}
              className="flex justify-center items-center gap-2 p-1 bg-gray-600 rounded text-2xl md:text-sm"
            >
              <BiDoorOpen />
              <span className="max-md:hidden">Quit</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
