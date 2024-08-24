import { useEffect, useState } from "react";
import { TextInputEl } from "../components/TextInput";
import LayoutService from "../layouts/LayoutService";
import { Button } from "../components/Button";
import Sidebar from "../components/Sidebar";
import { findUserById, updateUser } from "../../api/users";

// const token = localStorage.get('token'); 

export default function profile() {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const userId = localStorage.getItem('user_id')

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
            <div className="w-full flex px-20">
                <div className="mr-10 menu bg-neutral text-base-content  w-96 p-4 rounded-2xl h-[100vh]">
                    <Sidebar />
                </div>
                <div>
                    <div className="mb-5">
                        <h1 className="text-3xl">PROFILE</h1>
                    </div>
                    <div className="w-[1200px] ">
                        <form onSubmit={handleUpdate}>
                            <div className="w-full">
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5s h-16"} placeholder={"Username"} value={username || ''} handleChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"First name"} value={firstName || ''} handleChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"Last name"} value={lastName || ''} handleChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"email"} value={email || ''} handleChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"Phone Number"} value={phoneNumber || ''} handleChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className="w-full mb-3">
                                    <Button type={"submit"} title={"UPDATE"} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutService>
    );
}
