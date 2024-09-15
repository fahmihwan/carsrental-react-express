import { Link, useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector } from "react-redux";
export default function NavbarEl() {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()



    const logout = async () => {
        localStorage.clear()
        Cookies.remove('token')
        Cookies.remove('token_id')
        navigate('/', { replace: true })
    }

    return (
        <Navbar fluid className="shadow-lg  bg-[rgb(24,121,202)]">
            {/* <Navbar.Brand > */}
            <Link to={"/home"}>
                {/* <span className="self-center whitespace-nowrap text-xl font-semibold">Car Rentals</span> */}

                <div className="flex items-center space-x-3">
                    {/* Logo Icon */}
                    <div className="w-16 h-9 bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center rounded-lg shadow-lg transform rotate-45">
                        <div className="w-10 h-12 bg-white flex items-center justify-center rounded-md">
                            <span className="text-purple-500 text-3xl font-bold">Cr</span>
                        </div>
                    </div>
                    {/* Logo Text */}
                    <div>
                        <h1 className="text-4xl font-extrabold text-white">Car Rentals</h1>
                        <p className="text-base text-white">Find the best car hire deals</p>
                    </div>
                </div>
            </Link>

            {/* </Navbar.Brand> */}
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="/assets/user/user.png" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{user?.username}</span>
                        <span className="block truncate text-sm font-medium">{user?.email}</span>
                    </Dropdown.Header>

                    <Link to={"/home/profile"}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <button onClick={logout}>
                        <Dropdown.Item>
                            Logout
                        </Dropdown.Item>
                    </button>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            {/* <Navbar.Collapse>
                <Navbar.Link href="#" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
                <Navbar.Link href="#">Services</Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse> */}
        </Navbar>
    );





}