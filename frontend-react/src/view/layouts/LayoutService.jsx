import { useSelector } from "react-redux";
import NavbarEl from "../components/Navbar";

export default function LayoutService({ auth, header, children }) {
    const user = useSelector((state) => state.user.isAuthenticated)
    return (
        <div className="p-5 bg-[hsl(240,20%,98.04%)]">
            {user && (<NavbarEl />)}

            <div className="py-10">
                {/* layout */}
                {children}
                {/* layout */}
            </div>
        </div>
    );
}
