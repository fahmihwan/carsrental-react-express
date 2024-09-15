import { useState, useEffect } from "react";
import { TextInputEl } from "../components/TextInput";
import LayoutService from "../layouts/LayoutService";
import { Button } from "../components/Button";
import Sidebar from "../components/Sidebar";
import { findUserById, updateUser } from "../../api/users";
import Cookies from 'js-cookie';

export default function profile() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const userId = Cookies.get('user_id')

    useEffect(() => {
        findUserById(userId).then((res) => {
            const data = res.data;
            setUsername(data.username)
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setEmail(data.email)
            setPhoneNumber(data.phonenumber)
        })
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        updateUser(userId, {
            "username": username,
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "phonenumber": phoneNumber
        });
    }




    return (
        <LayoutService>
            <div className="flex w-full md:px-0 lg:px-60">
                <div className="mr-10 menu bg-neutral text-base-content  w-3/12  p-4 rounded-2xl h-[100vh]">
                    <Sidebar />
                </div>
                <div className="w-9/12">
                    <div className="bg-white p-5 rounded-lg border shadow-lg">
                        <div className="mb-5">
                            <h1 className="text-3xl">PROFILE</h1>
                        </div>
                        <div className=" ">
                            <form onSubmit={handleUpdate}>
                                <div className="w-full ">
                                    <div className="w-full flex">
                                        <div className="w-1/2 mb-3 mr-5">
                                            <TextInputEl className={"mr-5 "} placeholder={"First name"} value={firstName || ''} handleChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        <div className="w-1/2 mb-3">
                                            <TextInputEl className={"mr-5 "} placeholder={"Last name"} value={lastName || ''} handleChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="w-full flex">
                                        <div className="w-1/2 mb-3">
                                            <TextInputEl className={"mr-5"} placeholder={"Username"} value={username || ''} handleChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div className="w-1/2 mb-3">
                                            <TextInputEl className={"mr-5 h-16"} placeholder={"email"} value={email || ''} handleChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="w-full mb-3">
                                        <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"Phone Number"} value={phoneNumber || ''} handleChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                    <div className="w-full mb-3">
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutService>
    );
}
