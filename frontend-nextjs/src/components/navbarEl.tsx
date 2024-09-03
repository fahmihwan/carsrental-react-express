'use client';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { FC } from "react";

interface navbarProps {

}

export const NavbarEl: FC<navbarProps> = () => {

    // const navigate = useNavigate('')

    const logout: any = (e: { preventDefault: () => void }) => {

        // Cookies.remove('token')
        // Cookies.remove('token_id')

        // navigate('/', { replace: true })
    }


    return (
        <Navbar fluid rounded className="shadow-lg border">
            {/* <Navbar.Brand > */}
            <Link href={"/listcar"}>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Link>
            {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}

            {/* </Navbar.Brand> */}
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>

                    <Link href={"/home/profile"}>
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
};