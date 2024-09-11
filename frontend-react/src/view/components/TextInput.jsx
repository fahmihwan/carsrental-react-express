import { FileInput, Label, TextInput } from "flowbite-react"
import CreatableSelect from 'react-select/creatable';
import Datepicker from "react-tailwindcss-datepicker";

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

export const InputTimeEl = ({ placeholder, handleChange, value, className }) => {
    return (<>
        <label
            htmlFor="time"
            className={`block mb-2 text-sm font-medium  ${className}`}
        >
            {placeholder}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <input
                type="time"
                onChange={(e) => handleChange(e)}
                value={value}
                id="time"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                required=""
            />
        </div>
    </>
    )
}

// library range date 
export const InputRangeDateEl = ({ value, handleChange, placeholder, className }) => {
    return (

        <>
            <label
                htmlFor="time"
                className={`block mb-2 text-sm font-medium  ${className} `}
            >
                {placeholder}
            </label>
            <Datepicker
                separator="to"
                value={value}
                displayFormat="DD/MM/YYYY"
                onChange={e => handleChange(e)}
            />
        </>
        // <Datepicker
        //     separator="to"
        //     value={dateRange}
        //     displayFormat="DD/MM/YYYY"
        //     onChange={newValue => setDateRange(newValue)}
        // />
    )
}


// libraray react-select
export const InputReactSelectEl = ({ handleChange, value, placeholder, options, styles }) => {

    return (
        <>
            <CreatableSelect
                styles={styles}
                onChange={(e) => handleChange(e)}
                value={value}
                placeholder={placeholder}
                isClearable options={options} />

            {/* <CreatableSelect
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        width: '410px',
                                                        height: "60px",
                                                        marginRight: "20px"
                                                    }),
                                                }}
                                                onChange={(e) => setSelectedProvince({
                                                    value: e?.value ? e.value : 0,
                                                    label: e?.label ? e.label : ''
                                                })}
                                                value={selectedProvince.value != 0 && selectedProvince}
                                                placeholder="Province"
                                                isClearable
                                                options={allProvince}
                                                optionsCreatableSelect={allProvince} /> */}
        </>

    )

}