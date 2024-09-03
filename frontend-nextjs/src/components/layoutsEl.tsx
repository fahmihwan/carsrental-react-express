// 'use client';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { FC } from "react";
import { NavbarEl } from "./navbarEl";

interface navbarProps {

}

export const LayoutsEl: FC<navbarProps> = ({ auth, header, children }) => {

    // const navigate = useNavigate('')

    const logout: any = (e: { preventDefault: () => void }) => {

        // Cookies.remove('token')
        // Cookies.remove('token_id')

        // navigate('/', { replace: true })
    }


    return (
        <div className="p-5 bg-[hsl(240,20%,98.04%)]">
            <NavbarEl />

            <div className="py-10">
                {/* layout */}
                {children}
                {/* layout */}
            </div>
        </div >
    );
};