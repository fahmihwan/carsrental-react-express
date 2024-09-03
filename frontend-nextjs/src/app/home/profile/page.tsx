'use client'
import { TextInputEl } from "@/components/inputEl";
import { LayoutsEl } from "@/components/layoutsEl";
import SidebarEl from "@/components/sidebarEl";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";



interface FormData {
    username?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export default function Page() {

    const [data, setData] = useState<FormData>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    })

    useEffect(() => {

    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })

    }

    const handleUpdate = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        await fetch("http://localhost:8000/api/v1/subject", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                // router.push("/students");
            })
            .catch((err) => {
                console.log(err?.message);
            });

    }

    return (
        <LayoutsEl>
            <div className="w-full flex px-20">
                <div className="mr-10 menu bg-neutral text-base-content  w-96 p-4 rounded-2xl h-[100vh]">
                    <SidebarEl />
                </div>
                <div>
                    <div className="mb-5">
                        <h1 className="text-3xl">PROFILE</h1>
                    </div>
                    <div className="w-[1200px] ">
                        <form onSubmit={handleUpdate}>
                            <div className="w-full">
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5s h-16"} placeholder={"Username"} name="username" value={data?.username} handleChange={handleChange} readOnly={false} />
                                </div>
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"First name"} name="firstName" value={data.firstName} handleChange={handleChange} readOnly={false} />
                                </div>
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"Last name"} name="lastName" value={data.lastName} handleChange={handleChange} readOnly={false} />
                                </div>
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"email"} name="email" value={data.email} handleChange={handleChange} readOnly={false} />
                                </div>
                                <div className="w-full mb-3">
                                    <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"Phone Number"} name="phoneNumber" value={data.phoneNumber} handleChange={handleChange} readOnly={false} />
                                </div>
                                <div className="w-full mb-3">
                                    <Button type={"submit"} title={"UPDATE"} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutsEl>
    )
}