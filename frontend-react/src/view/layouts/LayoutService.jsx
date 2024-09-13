import NavbarEl from "../components/Navbar";
import Cookies from 'js-cookie';

export default function LayoutService({ auth, header, children }) {
    const user = Cookies.get('token')
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
