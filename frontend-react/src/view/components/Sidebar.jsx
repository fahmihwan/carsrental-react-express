import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <>
            <div
                href="#"
                className="block h-[700px] max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow "
            >
                <ul>
                    <li>
                        <div className=" flex bg-base-200 justify-center">
                            <figure>
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                                    alt="Movie" />
                            </figure>
                        </div>
                    </li>
                    <li className="mb-3"></li>
                    <li className="mb-3"><Link to={"/home/profile"} className="text-lg  bg-base-200">PROFILE</Link></li>
                    <li className="mb-3"><Link to={"/home/listcar"} className="text-lg  bg-base-200">List Cars</Link></li>
                </ul>
            </div>
        </>

    )
}
