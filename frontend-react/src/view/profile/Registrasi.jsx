import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { TextInputEl } from "../components/TextInput";
// import authenticated from "../../api/authenticated";
import { Link, useNavigate } from "react-router-dom";

import { Button, Card, } from "flowbite-react";

import { ToastErrorEl } from "../components/Toast";
import { useDispatch } from "react-redux";
import { setUserSlice } from "../../redux/features/userSlice";
import { registrasiUser } from "../../api/authenticated";

export default function Registrasi() {
    const dispatch = useDispatch()
    const [toastError, setToastError] = useState({
        isError: false,
        message: "",
    });




    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")


    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        registrasiUser({
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            phonenumber: phoneNumber

        }).then((res) => {
            alert('registrasi is successfully')
            navigate("/", { replace: true });
        }).catch((err) => alert('registrasi failed'))
    };

    return (
        <LayoutService>
            {toastError.isError && (
                <ToastErrorEl
                    message={toastError?.message}
                    onDismiss={() => setToastError({ isError: false, message: "" })}
                />
            )}
            <div className="w-full flex justify-center items-center" style={{ height: "80vh" }}>
                <Card className="w-[700px] s">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Registrasi</h5>
                    <form className="" onSubmit={handleLogin}>

                        <div className="w-full flex">
                            <div className="w-1/2 mb-3 mr-5">
                                <TextInputEl className={"mr-5 "} placeholder={"First name"} value={firstName || ''} handleChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="w-1/2 mb-3">
                                <TextInputEl className={"mr-5 "} placeholder={"Last name"} value={lastName || ''} handleChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-1/2 mb-3 mr-5">
                                <TextInputEl className={"mr-5"} placeholder={"Username"} value={username || ''} handleChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="w-1/2 mb-3">
                                <TextInputEl className={"mr-5 "}
                                    type="email"
                                    placeholder={"email"} value={email || ''} handleChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-1/2 mb-3 mr-5">
                                <TextInputEl className={"mr-5"} placeholder={"Phone Number"} value={phoneNumber || ''} handleChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="w-1/2 mb-3 ">
                                <TextInputEl
                                    type="password"
                                    className={"mr-5"} placeholder={"password"} value={password || ''} handleChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex mt-5">
                            <div className="mr-5">
                                <Button type="submit">Registrasi</Button>
                            </div>
                            <div className="flex">
                                <span className="mr-2">Already have an account?</span> <Link className="text-blue-600 hover:underline" to="/">Login</Link>
                            </div>
                        </div>




                    </form>

                </Card>
            </div>
        </LayoutService>
    );
}
