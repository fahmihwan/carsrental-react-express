import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { getCars } from './../../api/cars'
import { Link } from "react-router-dom";
import { Checkbox, List } from "flowbite-react";
import Stepper from "../components/Stepper";

import CreatableSelect from 'react-select/creatable';
import { getProvince, getRegency } from "../../api/apiwilayah";
import Datepicker from "react-tailwindcss-datepicker";
import { useSelector } from "react-redux";


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
            for (let i = 0; i < res.data.length; i++) {
                let features = res.data[i].features.split(",")

                res.data[i].listFeatures = [];
                for (let j = 0; j < features.length; j++) {
                    res.data[i].listFeatures.push(features[j])
                }
            }
            setCars(res.data)
        });
    }, [])

    const formatRupiah = (number) => {
        let format = new Intl.NumberFormat('id-ID', {
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
        return format

    };



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
                                    <CreatableSelect
                                        styles={{
                                            control: (baseStyles) => ({ ...baseStyles }),
                                        }}
                                        onChange={(e) => setSelectedProvince({
                                            value: e?.value ? e.value : 0,
                                            label: e?.label ? e.label : ''
                                        })}
                                        value={selectedProvince.value != 0 ? selectedProvince : ''}
                                        // {...(selectedProvince.value != 0 ? 'value={selectedProvince}' : '')}
                                        placeholder="Province" isClearable options={allProvince}
                                    />

                                </div>
                                <div>

                                    <CreatableSelect
                                        styles={{
                                            control: (baseStyles) => ({ ...baseStyles }),
                                        }}
                                        onChange={(e) => setSelectedRegency({
                                            value: e?.value ? e.value : 0,
                                            label: e?.label ? e.label : ''
                                        })}
                                        value={selectedRegency.value != 0 ? selectedRegency : ''}
                                        // {...(selectedRegency.value != 0 ? 'value={selectedRegency}' : '')}
                                        placeholder="Regency" isClearable options={allRegency} />

                                </div>
                                <div className="mb-2">
                                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-white dark:text-white">
                                        Pick-up and Drop-off location
                                    </label>
                                    <Datepicker
                                        separator="to"
                                        value={dateRange}
                                        displayFormat="DD/MM/YYYY"
                                        onChange={newValue => setDateRange(newValue)}
                                    />
                                </div>
                                <div className="w-full flex mb-3">
                                    <div className="w-1/2">
                                        <div className="mr-2">
                                            <label
                                                htmlFor="time"
                                                className="block mb-2 text-sm font-medium text-dark dark:text-white"
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
                                                    required=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <label
                                            htmlFor="time"
                                            className="block mb-2 text-sm font-medium text-dark dark:text-white"
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
                                <List.Item className="pb-3 sm:pb-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <Checkbox id="promotion" />
                                        <div className="min-w-0 flex-1">

                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">IDR 0 - IDR 100,000</div>
                                    </div>
                                </List.Item>
                                <List.Item className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <Checkbox id="promotion" />
                                        <div className="min-w-0 flex-1">
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">IDR 100,000 - IDR 200,000</div>
                                    </div>
                                </List.Item>
                                <List.Item className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <Checkbox id="promotion" />
                                        <div className="min-w-0 flex-1">
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">IDR 200,000 - IDR 300,000</div>
                                    </div>
                                </List.Item>
                                <List.Item className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <Checkbox id="promotion" />
                                        <div className="min-w-0 flex-1">

                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">IDR 400,000 - IDR 500,000</div>
                                    </div>
                                </List.Item>
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
                            <div
                                key={index}
                                style={{ width: "" }}
                                className="flex w-full mb-5  items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <img
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:max-w-72 md:rounded-none md:rounded-s-lg"
                                    src={`http://localhost:3000/uploads/` + car.file}
                                    alt=""
                                />
                                <div className=" justify-between   w-full">
                                    <div className="card-body pl-2 ">
                                        <h2 className="text-2xl"> {car.merk}</h2>
                                        <div className="flex w-full items-center">
                                            <div className="w-4/12 p-2 ">
                                                <p>{car.year} {car.license_plate}</p>
                                                <p>Jakarta - Pasar Rebo</p>
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
                                                        <Link className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/listcar/${car.id}/detailforrent`}>View Detail</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            // </div>
                        )) : <p>data tidak tesedia</p>}

                    </div>

                </div>
            </div>
        </LayoutService >
    );
}
