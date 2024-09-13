import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {

    const linkEnabled = `bg-blue-600 w-full block rounded-lg p-2 text-white`;
    const linkDisabled = `bg-base-200 w-full block rounded-lg p-2 text-black`;
    return (
        <>
            <div
                className="block h-[700px] p-6 bg-white border border-gray-200 rounded-lg shadow "
            >
                <ul>
                    <li>
                        <div className=" flex bg-base-200 justify-center mb-20">
                            <figure>
                                <img
                                    src="/assets/user/user.png"
                                    alt="Movie" />
                            </figure>
                        </div>
                    </li>
                    <li className="mb-3"></li>
                    <li className="mb-3">
                        <NavLink to={"/home/profile"} className={({ isActive }) => (isActive ? linkEnabled : linkDisabled)}
                        >PROFILE</NavLink>
                    </li>
                    <li className="mb-3 ">
                        <NavLink to={"/home/listcar"}
                            className={({ isActive }) => (isActive ? linkEnabled : linkDisabled)}
                        >List Cars</NavLink></li>
                    <li className="mb-3 "><NavLink
                        to="/#"
                        className={({ isActive }) => (isActive ? linkEnabled : linkDisabled)}
                    >Transaction history</NavLink></li>
                </ul>
            </div >
        </>

    )
}
