import { useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { TextInputEl } from "../components/TextInput";
import authenticated from "../../api/authenticated";
import { useNavigate } from "react-router-dom";

import { Button, Card, } from "flowbite-react";

import { ToastErrorEl } from "../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuth } from "../../redux/features/userSlice";
export default function Login() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    // const startedBooking = useSelector((state) => state.startedBooking);
    // console.log(user.isAuthenticated);

    // const user = useSelector((state) => state.isAuthenticated)

    const [toastError, setToastError] = useState({
        isError: false,
        message: "",
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const isAuth = await authenticated({ email, password });
        if (isAuth[1] === true) {
            dispatch(setUserAuth({ isAuthenticated: true }))
            navigate("/home", { replace: true });
        } else {
            console.log(isAuth);
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
