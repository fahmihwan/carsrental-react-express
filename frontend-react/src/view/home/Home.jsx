import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";

import { getProvince, getRegency } from "../../api/apiwilayah";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startedBookingUpdate } from "../../redux/features/startedBookingSlice";
import { InputTimeEl, InputRangeDateEl, InputReactSelectEl } from "../components/TextInput";


export default function Home() {
    const startedBooking = useSelector((state) => state.startedBooking);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [allProvince, setAllProvince] = useState([])
    const [selectedProvince, setSelectedProvince] = useState({
        label: "",
        value: 0
    })

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

        setSelectedProvince({
            label: startedBooking.selectedProvince.label,
            value: startedBooking.selectedProvince.value
        })
        setSelectedRegency({
            label: startedBooking.selectedRegency.label,
            value: startedBooking.selectedRegency.value
        })
        setDateRange({
            startDate: startedBooking.pickUpDate,
            endDate: startedBooking.dropOffDate
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
    }

    return (
        <LayoutService>
            {/* px-0 md:px-10 lg:px-20 xl:px-60 */}
            <div className="flex justify-center  ">
                <div className="card md:w-full xl:w-4/6 bg-neutral text-neutral-content h-96 border rounded-xl p-10 shadow-lg bg-white">
                    <div className="card-body ">

                        <h1 className="card-title text-4xl">Discover new rental car deals.!</h1>
                        <p className="text-2xl">How much will you save?</p>

                        <br />
                        <div className="bg-blue-600 rounded-lg p-5">
                            <div className="mb-3 w-full  ">
                                <div className=" ">
                                    <label className="text-white">Pick-up and Drop-off Date</label>
                                    <div className="w-full flex  ">

                                        <div className="w-1/2 mr-5">
                                            <InputReactSelectEl
                                                styles={{ control: (baseStyles) => ({ ...baseStyles, width: '100%', height: "60px" }), }}
                                                handleChange={(e) => setSelectedProvince({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })}
                                                value={selectedProvince.value != 0 && selectedProvince} placeholder="Province" options={allProvince}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <InputReactSelectEl
                                                styles={{ control: (baseStyles) => ({ ...baseStyles, width: '100%', height: "60px" }), }}
                                                handleChange={(e) => setSelectedRegency({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })}
                                                value={selectedRegency.value != 0 && selectedRegency} placeholder="Regency" options={allRegency}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex ">
                                <div className="w-full  ">
                                    <div className="flex">
                                        <div className="w-1/2 mr-2">
                                            <InputRangeDateEl
                                                value={dateRange}
                                                className={"text-white"}
                                                handleChange={(newValue) => setDateRange(newValue)}
                                                placeholder={"Pick-up and Drop-off Date"}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <div className="flex">
                                                <div className="w-1/2 mr-2">
                                                    <InputTimeEl
                                                        className={"text-white"}
                                                        placeholder={"Pick-up time : "}
                                                        handleChange={(e) => setPickUpTime(e.target.value)}
                                                        value={pickUpTime}
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <InputTimeEl
                                                        className={"text-white"}
                                                        placeholder={"Drop-of time : "}
                                                        handleChange={(e) => setDropOffTime(e.target.value)}
                                                        value={dropOffTime}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-2">
                                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">&nbsp;</label>
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
