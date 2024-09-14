import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { TextInputEl } from "../components/TextInput";
import authenticated from "../../api/authenticated";
import { useNavigate } from "react-router-dom";

import { Button, Card, } from "flowbite-react";

import { ToastErrorEl } from "../components/Toast";
import { useDispatch } from "react-redux";
import { setUserSlice } from "../../redux/features/userSlice";

export default function Login() {
    const dispatch = useDispatch()
    const [toastError, setToastError] = useState({
        isError: false,
        message: "",
    });

    const [email, setEmail] = useState("daris86@gmail.com");
    const [password, setPassword] = useState("qweqwe123");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const isAuth = await authenticated({ email, password });

        if (isAuth[1] === true) {

            dispatch(setUserSlice({
                email: isAuth[2].email,
                username: isAuth[2].username,
            }))

            navigate("/home", { replace: true });
        } else {
            setToastError({
                isError: true,
                message: "Username or password Invalid",
            });
        }
    };

    return (
        <LayoutService>
            {toastError.isError && (
                <ToastErrorEl
                    message={toastError?.message}
                    onDismiss={() => setToastError({ isError: false, message: "" })}
                />
            )}
            <div className="w-full flex justify-center" style={{ height: "80vh" }}>
                <Card className="w-[400px] h-[400px]">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Login</h5>
                    <form className="flex max-w-md flex-col gap-4" onSubmit={handleLogin}>
                        <div>
                            <TextInputEl
                                handleChange={(e) => setEmail(e.target.value)}
                                placeholder={"email"}
                                value={email}
                                type="email"
                            />
                        </div>
                        <div>
                            <TextInputEl
                                handleChange={(e) => setPassword(e.target.value)}
                                placeholder={"password"}
                                value={password}
                                type="password"
                            />
                        </div>

                        <Button type="submit">Login</Button>
                    </form>
                </Card>
            </div>
        </LayoutService>
    );
}
