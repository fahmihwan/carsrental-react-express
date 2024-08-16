import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";

import AsyncSelect from 'react-select/async';

import CreatableSelect from 'react-select/creatable';
import { getProvince, getRegency } from "../../api/apiwilayah";


export default function Home() {
    const [allProvince, setAllProvince] = useState([])
    const [provinceId, setProvinceId] = useState(0)
    const [allRegency, setAllRegency] = useState([])


    useEffect(() => {
        getProvince().then((res) => {
            let arrProvince = []
            for (let i = 0; i < res.data.length; i++) {
                arrProvince.push({
                    value: res.data[i].id,
                    label: res.data[i].name
                })
            }
            setAllProvince(arrProvince)
        })
    }, [])

    useEffect(() => {
        if (provinceId != 0) {
            getRegency(provinceId).then((res) => {
                let arrRegency = []
                for (let i = 0; i < res.data.length; i++) {
                    arrRegency.push({
                        value: res.data[i].id,
                        label: res.data[i].name
                    })
                }
                setAllRegency(arrRegency)

            })
        }

    }, [provinceId])


    return (
        <LayoutService>
            <div className="flex justify-center">
                <div className="card w-4/6 bg-neutral text-neutral-content h-96">
                    <div className="card-body">
                        <h1 className="card-title">Discover new rental car deals.!</h1>
                        <p>How much will you save?</p>

                        <div className="mb-3">
                            <label htmlFor="">Pick-up and Drop-off location</label>
                            <div className="w-full flex ">
                                <div className="mr-4">
                                    <CreatableSelect
                                        onChange={(e) => setProvinceId(e?.value ? e.value : 0)}
                                        className="w-96 "
                                        placeholder="Province"
                                        isClearable options={allProvince} />

                                </div>
                                <div>
                                    {/* <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} /> */}
                                    <CreatableSelect
                                        className="w-96 "
                                        placeholder="Regency"
                                        isClearable options={allRegency} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex">
                            <div className="w-2/3 flex">
                                <div className="w-1/2 mr-5">
                                    <div className="label">
                                        <span className="label-text">Pick-up </span>
                                    </div>
                                    <input
                                        type="datetime-local"
                                        placeholder="Pick-up"
                                        className="input input-bordered input-accent w-full "
                                    />
                                </div>
                                <div className="w-1/2 mr-5">
                                    <div className="label">
                                        <span className="label-text">Drop-off </span>
                                    </div>
                                    <input
                                        type="datetime-local"
                                        placeholder="Pick-up time"
                                        className="input input-bordered input-accent w-full "
                                    />
                                </div>

                            </div>
                            <div className="w-1/3">
                                <div className="label">
                                    <span className="label-text">&nbsp;</span>
                                </div>
                                <div className="card-actions ">
                                    <button className="btn w-32 btn-info">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutService>
    );
}
