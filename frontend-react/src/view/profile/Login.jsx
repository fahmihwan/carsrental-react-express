import { useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { TextInputPassword, TextInputUsername } from "../components/TextInput";
import authenticated from "../../api/authenticated";
import { useNavigate } from "react-router-dom";


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
            <div className="w-full flex justify-center  px-20">
                <div className="card  w-96  shadow-md bg-neutral " style={{ marginTop: "80px" }}>
                    <div className="card-body">
                        <h2 className="card-title text-center">Login!</h2>
                        <p>car Rentals</p>
                        <p>{email}</p>
                        <p>{password}</p>
                        <form onSubmit={handleLogin}>
                            <TextInputUsername
                                handleChange={(e) => setEmail(e.target.value)}
                                placeholder={'email'}
                                value={email}
                                type="email" />
                            <TextInputPassword
                                type="password"
                                handleChange={(e) => setPassword(e.target.value)}
                                placeholder={'password'}
                                value={password}
                            />
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Sign in</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </LayoutService>
    );
}
