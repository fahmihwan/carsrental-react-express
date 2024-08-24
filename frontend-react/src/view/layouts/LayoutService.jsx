import NavbarEl from "../components/Navbar";


export default function LayoutService({ auth, header, children }) {
    return (
        // <div className="p-5 bg-purple-500">
        <div className="p-5">
            <NavbarEl />

            <div className="py-10">
                {/* layout */}
                {children}
                {/* layout */}
            </div>
        </div >)
}