import Navbar from "../components/Navbar";


export default function LayoutService({ auth, header, children }) {
    return (<div className="p-5">
        <Navbar />

        <div className="py-10">
            {/* layout */}
            {children}
            {/* layout */}
        </div>
    </div>)
}