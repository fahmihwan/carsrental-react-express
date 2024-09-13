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
        <Navbar fluid rounded className="shadow-lg border">
            {/* <Navbar.Brand > */}
            <Link to={"/home"}>
                <span className="self-center whitespace-nowrap text-xl font-semibold">Car Rentals</span>
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