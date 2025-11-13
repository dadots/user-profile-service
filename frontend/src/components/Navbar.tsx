import AvatarDropdown from "./AvatarDropdown";

interface NavbarProps {
    userName: string | null;
    onLogout: () => void;
}

const Navbar = ({ userName, onLogout }: NavbarProps) => {
    return (
        <div className="navbar bg-gray-100 shadow-sm">
            <div className="flex-1">
                <div className="text-xl text-gray-700">Dars</div>
            </div>
            <AvatarDropdown userName={userName} onLogout={onLogout} />
        </div>
    );
};

export default Navbar;