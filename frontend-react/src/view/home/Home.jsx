import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";


import CreatableSelect from 'react-select/creatable';
import { getProvince, getRegency } from "../../api/apiwilayah";

import Datepicker from "react-tailwindcss-datepicker";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startedBookingUpdate } from "../../redux/features/startedBookingSlice";


export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [allProvince, setAllProvince] = useState([])
    const [selectedProvince, setSelectedProvince] = useState({ value: 0, label: '' })
    const [selectedRegency, setSelectedRegency] = useState({ value: 0, label: '' })

    const [allRegency, setAllRegency] = useState([])
    const [pickUpTime, setPickUpTime] = useState('10:00')
    const [dropOffTime, setDropOffTime] = useState('10:10')



    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });

    useEffect(() => {
        getProvince().then((res) => {
            let arrProvince = []
            for (let i = 0; i < res.data?.length; i++) {
                arrProvince.push({
                    value: res.data[i].id,
                    label: res.data[i].name
                })
            }
            setAllProvince(arrProvince)
        })
    }, [])

    useEffect(() => {
        if (selectedProvince?.value != 0) {
            getRegency(selectedProvince?.value).then((res) => {
                let arrRegency = []
                for (let i = 0; i < res.data?.length; i++) {
                    arrRegency.push({
                        value: res.data[i].id,
                        label: res.data[i].name
                    })
                }
                setAllRegency(arrRegency)

            })
        }
    }, [selectedProvince.value])



    const BookNow = () => {
        dispatch(startedBookingUpdate({
            pickUpDate: dateRange?.startDate,
            dropOffDate: dateRange?.endDate,
            pickUpTime: pickUpTime,
            dropOffTime: dropOffTime,
            selectedProvince: selectedProvince,
            selectedRegency: selectedRegency,
        }))
        navigate('/listcar')
        // try {
        //     let payload = {
        //         dateRange: dateRange,
        //         pickUpTime: pickUpTime,
        //         dropOffTime: dropOffTime
        //     }
        //     const response = await fetch(`http://localhost:3000/api/api-midtrans`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(payload)
        //     })
        //     const data = await response.json()
        //     console.log(data);
        //     return data;
        // } catch (error) {
        //     return error;
        // }
    }





    return (
        <LayoutService>
            <div className="flex justify-center  ">
                <div className="card w-4/6 bg-neutral text-neutral-content h-96 border rounded-xl p-10 shadow-lg bg-white">
                    <div className="card-body">

                        <h1 className="card-title text-4xl">Discover new rental car deals.!</h1>
                        <p className="text-2xl">How much will you save?</p>

                        <br />
                        <div className="bg-blue-600 rounded-lg p-5">
                            <div className="mb-3 w-full  ">
                                <div className="w-2/3 ">
                                    <label className="text-white">Pick-up and Drop-off Date</label>
                                    <div className="w-full flex  ">

                                        <div className="">
                                            <CreatableSelect
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
                                                {...(selectedProvince.value != 0 ? 'value={selectedProvince}' : '')}
                                                placeholder="Province"
                                                isClearable options={allProvince} />

                                        </div>
                                        <div>
                                            <CreatableSelect
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        width: '410px',
                                                        height: "60px"
                                                    }),
                                                }}
                                                onChange={(e) => setSelectedRegency({
                                                    value: e?.value ? e.value : 0,
                                                    label: e?.label ? e.label : ''
                                                })}
                                                placeholder="Regency"
                                                {...(selectedRegency.value != 0 ? 'value={selectedRegency}' : '')}
                                                isClearable options={allRegency} />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex ">
                                <div className="w-2/3  ">
                                    <div className="flex">
                                        <div className="w-1/2">
                                            <div className="mr-2">
                                                <label
                                                    htmlFor="time"
                                                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                                                >
                                                    Pick-up and Drop-off location
                                                </label>
                                                <Datepicker
                                                    separator="to"
                                                    value={dateRange}
                                                    displayFormat="DD/MM/YYYY"
                                                    onChange={newValue => setDateRange(newValue)}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <div className="flex">
                                                <div className="w-1/2">
                                                    <div className="mr-2">
                                                        <label
                                                            htmlFor="time"
                                                            className="block mb-2 text-sm font-medium text-white dark:text-white"
                                                        >
                                                            Pick-up time:
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                                <svg
                                                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                                                                onChange={(e) => setPickUpTime(e.target.value)}
                                                                value={pickUpTime}
                                                                id="time"
                                                                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                min="09:00"
                                                                max="18:00"
                                                                // defaultValue="00:00"
                                                                required=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-1/2">
                                                    <label
                                                        htmlFor="time"
                                                        className="block mb-2 text-sm font-medium text-white dark:text-white"
                                                    >
                                                        Drop-of time:
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                            <svg
                                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                                                            id="time"
                                                            onChange={(e) => setDropOffTime(e.target.value)}
                                                            value={dropOffTime}
                                                            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            min="09:00"
                                                            max="18:00"
                                                            // defaultValue="00:00"
                                                            required=""
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-2">
                                    <label
                                        htmlFor="time"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        &nbsp;
                                    </label>
                                    <button type="button" onClick={BookNow} className="text-black w-[113px] bg-yellow-200 hover:bg-yellow-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ">Search</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutService>
    );
}
