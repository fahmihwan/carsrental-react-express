import { FileInput, Label, TextInput } from "flowbite-react"

export const TextInputEl = ({ type = 'text', name, id, placeholder, handleChange, value, readOnly = false, className }) => {
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
                className={`${className}`} placeholder={placeholder}
                required shadow />
        </>
        // <label className="form-control w-full ">
        //     <div className="label">
        //         <span className="label-text">{placeholder}</span>
        //     </div>
        //     <input
        //         placeholder={'input ' + placeholder}
        //         className={`input input-bordered ${className} `}
        //         onChange={(e) => handleChange(e)}
        //         value={value}
        //         readOnly={readOnly}
        //         id={id}
        //         name={name}
        //         type={type} />

        // </label>
    )
}

export const TextInputUploadEl = ({ type = 'file', name, id, placeholder, handleChange, value, className }) => {

    return (
        <>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor={id} value={placeholder} />
                </div>
                <FileInput
                    type={type}
                    value={value}
                    onChange={(e) => handleChange(e)}
                    id={id}
                    name={name}
                />
            </div>

        </>
    )
}

export const TextInputUsername = ({ type = 'text', name, id, placeholder, handleChange, value }) => {
    return (
        <>
            <div className="mb-2 block">
                <Label htmlFor={id} value={placeholder} />
            </div>
            <TextInput
                id={id}
                name={name}
                onChange={(e) => handleChange(e)}
                value={value}
                className="grow" placeholder={placeholder}
                required shadow />
        </>

    )
}

export const TextInputPassword = ({ type = 'password', name, id, placeholder, handleChange, value }) => {

    return (
        <label className="input input-bordered flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
            </svg>
            <input type={type}
                name={name}
                id={id}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
                className="grow"
                value={value} />
        </label>
    )
}