import { useLocation } from "react-router-dom";
import NavbarEl from "../components/Navbar";
import Cookies from 'js-cookie';

export default function LayoutService({ auth, header, children }) {
    const user = Cookies.get('token')
    const location = useLocation();
    // console.log(location.pathname);
    return (
        <>

            {location.pathname == '/home' ? (
                <div className="absolute top-10 -z-20 bg-[hsl(240,20%,98.04%)]">
                    {/* <img src="/assets/dashboard.webp" alt="" /> */}
                    <img src="/assets/dashboard2.jpg" alt="" />
                </div>
            ) : (<div className="absolute left-0 right-0 -z-20 bg-[rgb(24,121,202)] h-72 "></div>)}


            <div className="bg-[hsl(240,20%,98.04%)]s">
                {user && (<NavbarEl />)}
                <div className="py-10">
                    {/* layout */}
                    {children}
                    {/* layout */}
                </div>
            </div >
        </>

    );
}
