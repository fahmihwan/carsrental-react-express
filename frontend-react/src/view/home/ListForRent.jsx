import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { getCars } from './../../api/cars'
import { Link } from "react-router-dom";
import { Checkbox, List } from "flowbite-react";
import Stepper from "../components/Stepper";

import { getProvince, getRegency } from "../../api/apiwilayah";
import { useSelector } from "react-redux";
import { InputRangeDateEl, InputReactSelectEl, InputTimeEl } from "../components/TextInput";
import { fFormatRupiah } from "../../utils/utils";

export default function ListForRent() {
    const startedBooking = useSelector((state) => state.startedBooking);

    const [allProvince, setAllProvince] = useState([])
    const [selectedProvince, setSelectedProvince] = useState({ value: 0, label: '' })

    const [selectedRegency, setSelectedRegency] = useState({ value: 0, label: '' })
    const [allRegency, setAllRegency] = useState([])
    const [pickUpTime, setPickUpTime] = useState('10:00')
    const [dropOffTime, setDropOffTime] = useState('10:10')

    const [cars, setCars] = useState([])

    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });


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
    }, [selectedProvince])


    useEffect(() => {
        setDateRange({
            startDate: startedBooking.pickUpDate,
            endDate: startedBooking.dropOffDate
        })
        setSelectedProvince({
            value: startedBooking.selectedProvince.value,
            label: startedBooking.selectedProvince.label
        })

        setSelectedRegency({
            value: startedBooking.selectedRegency.value,
            label: startedBooking.selectedRegency.label
        })

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

        getCars().then((res) => {
            console.log(res);
            for (let i = 0; i < res?.data?.length; i++) {
                let features = res?.data[i]?.features.split(",")

                res.data[i].listFeatures = [];
                for (let j = 0; j < features?.length; j++) {
                    res.data[i].listFeatures.push(features[j])
                }
            }
            setCars(res.data)
        });
    }, [])

    let filterPrice = [
        { id: 1, title: "IDR 0 - IDR 100,000" },
        { id: 2, title: "IDR 100,000 - IDR 200,000" },
        { id: 3, title: "IDR 200,000 - IDR 300,000" },
        { id: 4, title: "IDR 400,000 - IDR 500,000" },
    ]



    return (
        <LayoutService>
            <div className="w-full flex px-0 md:px-10 lg:px-20 xl:px-60 ">
                <div className="w-2/6 flex justify-start  mr-5 md:mr-5 lg:mr-5 xl:mr-0">
                    <div className=" bg-white w-96 h-[600px] rounded-lg p-5 ">
                        <div className="mb-10">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-5">
                                Modify search
                            </h5>
                            <div>
                                <label
                                    htmlFor="time"
                                    className="block mb-2 text-sm font-medium text-dark dark:text-white"
                                >
                                    Pick-up and Drop-off location
                                </label>
                                <div className="mb-3">
                                    <InputReactSelectEl
                                        styles={{ control: (baseStyles) => ({ ...baseStyles }) }}
                                        handleChange={(e) => setSelectedProvince({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })}
                                        value={selectedProvince.value != 0 ? selectedProvince : ''}
                                        placeholder={"Province"}
                                        options={allProvince}
                                    />
                                </div>
                                <div className="mb-5">
                                    <InputReactSelectEl
                                        styles={{ control: (baseStyles) => ({ ...baseStyles }) }}
                                        handleChange={(e) => setSelectedRegency({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })}
                                        value={selectedRegency.value != 0 ? selectedRegency : ''}
                                        placeholder={"Regency"}
                                        options={allRegency}
                                    />

                                </div>
                                <div className="mb-5">
                                    <InputRangeDateEl
                                        className={"text-dark"}
                                        placeholder={"Pick-up and Drop-off location"}
                                        value={dateRange}
                                        handleChange={newValue => setDateRange(newValue)}
                                    />
                                </div>
                                <div className="w-full flex mb-3">
                                    <div className="w-1/2 mr-2">
                                        <InputTimeEl
                                            className="text-dark"
                                            placeholder={"Pick-up time : "}
                                            handleChange={(e) => setPickUpTime(e.target.value)}
                                            value={pickUpTime}
                                        />

                                    </div>
                                    <div className="w-1/2">
                                        <InputTimeEl
                                            className="text-dark"
                                            placeholder={"Drop-of time : "}
                                            handleChange={(e) => setDropOffTime(e.target.value)}
                                            value={dropOffTime}
                                        />
                                    </div>
                                </div>
                                <div className="w-full ">
                                    <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Search</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-5">
                                Filter Results
                            </h5>
                            <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                {filterPrice.map((d, i) => (
                                    <List.Item className="pb-3 sm:pb-4" key={d.id}>
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <Checkbox id="promotion" />
                                            <div className="min-w-0 flex-1">
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{d.title}</div>
                                        </div>
                                    </List.Item>
                                ))}
                            </List>
                            <div className="w-full ">
                                <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Modify search</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-4/6 ">
                    <Stepper isStepNumberActive={2} />
                    <div className="mb-5">
                        <h1>{cars?.length} Cars Available</h1>
                    </div>
                    <div className=" flex flex-col">
                        {cars?.length > 0 ? cars.map((car, index) => (
                            <CardListCarCompt key={index} car={car} formatRupiah={fFormatRupiah} />
                        )) : <p>data tidak tesedia</p>}

                    </div>
                </div>
            </div>
        </LayoutService >
    );
}

const CardListCarCompt = ({ car, formatRupiah }) => {
    const baseUrl = "http://localhost:3000/uploads/"

    return (
        <div
            // key={key}
            style={{ width: "" }}
            className="flex w-full mb-5  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
            <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:max-w-72 md:rounded-none md:rounded-s-lg"
                src={baseUrl + car.file}
                alt=""
            />
            <div className=" justify-between   w-full">
                <div className="card-body pl-2 ">
                    <h2 className="text-2xl"> {car.merk}</h2>
                    <div className="flex w-full items-center">
                        <div className="w-4/12 p-2 ">
                            <p>{car.year} {car.license_plate}</p>
                            <p>{car.addresss}</p>
                        </div>
                        <div className="w-5/12">
                            <ul className="max-w-xs text-gray-500 list-disc list-inside dark:text-gray-400">
                                {
                                    car.listFeatures.map((d, i) => {
                                        let splitType = d.split('~')
                                        if (splitType[1].split(' ').join('') == 'PASSENGERS') {
                                            return <li key={i} className="mr-2">{splitType[0]}</li>
                                        }
                                        if (splitType[1].split(' ').join('') == 'BAGS') {
                                            return <li key={i} className="mr-2">{splitType[0]}</li>
                                        }
                                        if (splitType[1].split(' ').join('') == 'TRANSMISSION') {
                                            return <li key={i} className="mr-2">{splitType[0]}</li>
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <div className="w-3/12 border-l-2 h-[100%] items-center flex  p-2">
                            <div className="">
                                <p className="text-xl mb-3">IDR {formatRupiah(car.daily_rental_price)}</p>
                                <div>
                                    <Link className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  " to={`/listcar/${car.id}/detailforrent`}>View Detail</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
