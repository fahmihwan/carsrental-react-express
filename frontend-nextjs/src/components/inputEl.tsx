

import { FileInput, Label, TextInput } from "flowbite-react"
import { ChangeEvent, FC } from "react";


interface textInputProps {
    type?: string;
    name: any;
    id?: string;
    placeholder: any;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string | undefined | string[];
    readOnly: boolean;
    className: any;

}



export const TextInputEl: FC<textInputProps> = ({ type = 'text', name, id, placeholder, handleChange, value, readOnly = false, className }) => {
    return (
        <>
            <div className="mb-2 block">
                <Label htmlFor={id} value={placeholder} />
            </div>
            <TextInput
                id={id}
                name={name}
                type={type}
                onChange={(e) => handleChange(e)}
                value={value}
                className="grow" placeholder={placeholder}
                required shadow />
        </>
    )
}