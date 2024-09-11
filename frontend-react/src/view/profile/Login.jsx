import { useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { TextInputEl, TextInputPassword, TextInputUsername } from "../components/TextInput";
import authenticated from "../../api/authenticated";
import { useNavigate } from "react-router-dom";

import { Button, Card, Toast } from "flowbite-react";

import { HiFire } from "react-icons/hi";
export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        const isAuth = await authenticated({ email, password })
        if (isAuth[1] === true) {
            navigate("/home", { replace: true });
        }
    }

    return (
        <LayoutService>

            <div className="w-full flex justify-center">
                <Card className="w-[400px]">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Logins
                    </h5>

                    <form className="flex max-w-md flex-col gap-4" onSubmit={handleLogin}>
                        <div>

                            <TextInputEl
                                handleChange={(e) => setEmail(e.target.value)}
                                placeholder={'email'}
                                value={email}
                                type="email" />
                        </div>

                        <div>
                            <TextInputEl
                                handleChange={(e) => setPassword(e.target.value)}
                                placeholder={'password'}
                                value={password}
                                type="password" />
                        </div>

                        <Button type="submit">Login</Button>
                    </form>
                </Card>
            </div>


        </LayoutService>
    );
}
