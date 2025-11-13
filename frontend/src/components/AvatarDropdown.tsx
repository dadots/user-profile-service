import { Link } from "react-router-dom";

interface AvatarDropdownProps {
    onLogout: () => void;
    avatarUrl?: string;
    userName?: string | null;
}

const AvatarDropdown = ({ onLogout, avatarUrl, userName }: AvatarDropdownProps) => {
    return (
        // <div className="dropdown dropdown-end">
        //     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        //         <div className="w-10 rounded-full">
        //             <img
        //                 alt="Avatar"
        //                 src={avatarUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
        //             />
        //         </div>
        //     </div>
        //     <ul
        //         tabIndex="-1"
        //         className="menu menu-sm dropdown-content bg-primary-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        //     >
        //         <li>
        //             <Link to="/profile">Profile</Link>
        //         </li>
        //         <li>
        //             <button onClick={onLogout}>Logout</button>
        //         </li>
        //     </ul>
        // </div>
        <div className="flex gap-2 items-center">
                <span className="font-medium text-gray-700">
                    {userName ? `Welcome, ${userName}!` : ''}
                </span>

                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-primary-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <Link to={"/profile"}>
                            Profile
                        </Link>
                    </li>
                    <li><button onClick={onLogout}>Logout</button></li>
                </ul>
                </div>
            </div>
    );
};

export default AvatarDropdown;