import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { getCars } from './../../api/cars'
import { Link } from "react-router-dom";
import { Avatar, Card, Checkbox, Label, List } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
import { faU, faUser } from '@fortawesome/free-solid-svg-icons';
import Stepper from "../components/Stepper";

export default function ListForRent() {

    const [cars, setCars] = useState([])

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

            <div className="w-full flex px-20">
                <div className="w-2/6 flex justify-start  ">

                    <div className=" bg-white w-96 h-[600px]  rounded-lg p-5 ">
                        <div>
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-5">
                                Filter <br />
                                Price per day

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
                        </div>
                    </div>

                </div>
                <div className="w-4/6 ">


                    {/* <div className="mb-5 ">
                        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                            <li className="flex items-center text-blue-600 dark:text-blue-500">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                                    1
                                </span>
                                Create request
                                <svg
                                    className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 12 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                    />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                    2
                                </span>
                                Choose a vehcile
                                <svg
                                    className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 12 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                    />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                    3
                                </span>
                                Services & book
                                <svg
                                    className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 12 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                    />
                                </svg>
                            </li>
                            <li className="flex items-center">
                                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                    4
                                </span>
                                Summary
                                <svg
                                    className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 12 10"
                                >
                                </svg>
                            </li>
                        </ol>
                    </div> */}
                    <Stepper />


                    <div className="mb-5">
                        <h1>5 Cars Available</h1>
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
