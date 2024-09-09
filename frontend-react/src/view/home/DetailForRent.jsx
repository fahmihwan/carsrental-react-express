import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { findCarById } from "../../api/cars";
import { useParams } from "react-router-dom";
import { Accordion, Label, Radio } from "flowbite-react";
import Stepper from "../components/Stepper";
import { findUserById } from "../../api/users";
import Cookies from 'js-cookie';
import { TextInputEl } from "../components/TextInput";
import { useSelector } from "react-redux";
import moment from 'moment'

export default function DetailForRent() {
    const { id } = useParams()

    const startedBooking = useSelector((state) => state.startedBooking);
    // console.log(moment(startedBooking.pickUpDate).format('));
    const [car, setCar] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('')

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const userId = Cookies.get('user_id')
    useEffect(() => {
        findCarById(id).then((res) => setCar(res.data));
        findUserById(userId).then((res) => {
            const data = res.data;
            setUsername(data.username)
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setEmail(data.email)
            setPhoneNumber(data.phonenumber)
        })
    }, [])


    // utils
    const makeFormatDateTime = (valueDatepicker, valueFromTimePicker) => {
        let momentDate = moment(valueDatepicker).format("DD-MM-YYYY")
        const [hari, bulan, tahun] = momentDate.split('-')
        const [jam, menit] = valueFromTimePicker.split(":")
        const tanggal = new Date(tahun, bulan - 1, hari, jam, menit)
        const isoTgl = tanggal.toISOString()
        return isoTgl;
    }


    // utils
    const calculateTimeDifference = (date1, date2) => {
        const dateObj1 = new Date(date1);
        const dateObj2 = new Date(date2);
        const timeDifference = dateObj2 - dateObj1; // Selisih dalam milidetik
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        return hoursDifference  //satuan jam
    }


    //  NOTED : jika lebih dari 12 jam di hitung nambah hari, jka kurang dari 12 jam di hitung hari ini saja
    let formulaQtyMidtrans = 0;

    let startDate = makeFormatDateTime(startedBooking.pickUpDate, startedBooking.pickUpTime)
    let endDate = makeFormatDateTime(startedBooking.dropOffDate, startedBooking.pickUpTime)
    const difference = calculateTimeDifference(startDate, endDate);
    console.log(startDate);
    //utils, per 2 jam naik 1.5 
    function calculateTimeForPrice(jam) {
        const jamPerHari = 24;
        if (jam < 24) {
            return 1;
        }
        const hariPenuh = Math.floor(jam / jamPerHari);
        const sisaJam = jam % jamPerHari;
        const desimalHari = sisaJam / jamPerHari;
        const hasil = hariPenuh + desimalHari;
        return Math.round(hasil)
    }

    formulaQtyMidtrans = calculateTimeForPrice(difference).toFixed(1)

    let price = formulaQtyMidtrans * car.daily_rental_price;

    const formatRupiah = (number) => {
        let format = new Intl.NumberFormat('id-ID', {
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
        return format
    };


    // console.log(startedBooking);

    const BookNow = async () => {
        if (paymentMethod == '') {
            alert('select payment method')
            return
        }

        try {
            let payload = {
                bank: paymentMethod,
                carId: car.id,
                userId: userId,
                startDate: startedBooking.pickUpDate,
                endDate: startedBooking.dropOffDate,
                pickUpTime: startedBooking.pickUpTime,
                dropOffTime: startedBooking.dropOffTime
            }
            const response = await fetch(`http://localhost:3000/api/api-midtrans`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json()
            console.log(data);
            return data;
        } catch (error) {
            return error;
        }
    }





    return (
        <LayoutService>
            <div className="absolute z-40">
                <div id="snap-container"></div>
            </div>

            <div className="w-full flex lg:px-0 xl:px-52 ">
                <div className="w-4/6 ">
                    <Stepper isStepNumberActive={3} />
                    <div>
                        <div
                            href="#"
                            className="flex flex-col items-center bg-white border mb-5 border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <img
                                className="object-cover w-full rounded-t-lg  h-[500px] md:h-auto md:w-[300px] md:rounded-none md:rounded-s-lg"
                                src={`http://localhost:3000/uploads/` + car.file}
                                alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {car.merk}
                                </h5>
                                <p>{car.year} {car.license_plate}</p>
                                <p className="text-2xl">IDR {formatRupiah(car.daily_rental_price)}</p>
                                <p>Jakarta - Pasar Rebo</p>
                            </div>
                        </div>


                        <div className="w-full items-center bg-white mb-5 border-gray-200 rounded-lg shadow md:flex-row md:max-w-full ">
                            <div className="flex  flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Driver Details
                                </h5>

                                <div className="w-full">
                                    <div>
                                        <div className="w-full flex">
                                            <div className="w-1/3 mb-3 mr-5">
                                                <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"Username"} value={username || ''} handleChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                            <div className="w-1/3 mb-3 mr-5">
                                                <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"First name"} value={firstName || ''} handleChange={(e) => setFirstName(e.target.value)} />
                                            </div>
                                            <div className="w-1/3 mb-3">
                                                <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"Last name"} value={lastName || ''} handleChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="w-full flex">
                                            <div className="w-1/3 mb-3 mr-5">
                                                <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"email"} value={email || ''} handleChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="w-1/3 mb-3 mr-5">
                                                <TextInputEl className={"w-[500px] mr-5 h-16"} placeholder={"Phone Number"} value={phoneNumber || ''} handleChange={(e) => setPhoneNumber(e.target.value)} />
                                            </div>
                                            <div className="w-1/3 mb-3">
                                                <div className="mb-2 block">
                                                    &nbsp;
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card  bg-neutral text-neutral-content shadow-xl  mb-10 p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Payment Detail
                            </h5>
                            <Accordion>
                                <Accordion.Panel>
                                    <Accordion.Title>Bank Transfer</Accordion.Title>
                                    <Accordion.Content>
                                        <fieldset className="flex max-w-md flex-col gap-4">
                                            <div className="flex items-center gap-2">
                                                <Radio id="united-state" name="countries" onChange={() => setPaymentMethod('BCA')} value="BCA" defaultChecked />
                                                <Label htmlFor="united-state">BCA Virtual Account                                                </Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Radio id="germany" name="countries" onChange={() => setPaymentMethod('BNI')} value="BNI" />
                                                <Label htmlFor="germany">BNI Virtual Account</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Radio id="spain" name="countries" onChange={() => setPaymentMethod('BRI')} value="BRI" />
                                                <Label htmlFor="spain">BRI Virtual Account</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Radio id="uk" name="countries" onChange={() => setPaymentMethod('MANDIRI')} value="MANDIRI" />
                                                <Label htmlFor="uk">Mandiri Virtual Account</Label>
                                            </div>
                                        </fieldset>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>Card Payment</Accordion.Title>
                                    <Accordion.Content>
                                        <fieldset className="flex max-w-md flex-col gap-4">
                                            <div className="flex items-center gap-2">
                                                <Radio id="united-state" name="countries" onClick={() => setPaymentMethod('BCA')} value="BCA" defaultChecked />
                                                <Label htmlFor="united-state">BCA Virtual Account                                                </Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Radio id="germany" name="countries" onClick={() => setPaymentMethod('BNI')} value="BNI" />
                                                <Label htmlFor="germany">BNI Virtual Account</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Radio id="spain" name="countries" onClick={() => setPaymentMethod('BRI')} value="BRI" />
                                                <Label htmlFor="spain">BRI Virtual Account</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Radio id="uk" name="countries" onClick={() => setPaymentMethod('MANDIRI')} value="MANDIRI" />
                                                <Label htmlFor="uk">Mandiri Virtual Account</Label>
                                            </div>
                                        </fieldset>
                                    </Accordion.Content>
                                </Accordion.Panel>

                                <Accordion.Panel>
                                    <Accordion.Title>E-Wallet</Accordion.Title>
                                    <Accordion.Content>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            The main difference is that the core components from Flowbite are open source under the MIT license, whereas
                                            Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
                                            components, whereas Tailwind UI offers sections of pages.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
                                            technical reason stopping you from using the best of two worlds.
                                        </p>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                                        <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                                            <li>
                                                <a href="https://flowbite.com/pro/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                                    Flowbite Pro
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://tailwindui.com/"
                                                    rel="nofollow"
                                                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                                                >
                                                    Tailwind UI
                                                </a>
                                            </li>
                                        </ul>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>Over the Counter Payment</Accordion.Title>
                                    <Accordion.Content>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
                                            has a design equivalent in our Figma file.
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Check out the
                                            <a href="https://flowbite.com/figma/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                                Figma design system
                                            </a>
                                            based on the utility classes from Tailwind CSS and components from Flowbite.
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </div>

                        <div className="w-full">
                            <div className="flex justify-between">
                                <h1>Total Price</h1>  <p>Rp. {formatRupiah(price)} </p>
                            </div>
                            <div>
                                {/* <button onClick={pay} className="btn btn-primary">Pay </button> */}
                            </div>
                        </div>

                        <div>
                            <div className="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" checked="checked" />
                                <div className="collapse-title text-xl font-medium">Virtual Account</div>
                                <div className="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium">ATM/Other Banks</div>
                                <div className="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium">Card / Debit Cards</div>
                                <div className="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium">Convenience Store</div>
                                <div className="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-2/6 flex justify-end  ">
                    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow h-[600px]">
                        <div className="flex flex-col">
                            <div className="card bg-primary text-primary-content w-96 mb-10">
                                <div className="card-body">
                                    <h2 className="card-title">Pick-up and drop-off</h2>
                                    <div className="w-full ">
                                        <div className="11/12  border-l-4 px-5">
                                            <div className="mb-10">
                                                <p>{moment(startedBooking.pickUpDate).format('ddd, D MMMM YYYY')} · {startedBooking.pickUpTime}</p>
                                                <b className="">{startedBooking.selectedProvince.label} - {startedBooking.selectedRegency.label}</b>
                                            </div>
                                            <div>
                                                <p>{moment(startedBooking.dropOffDate).format('ddd, D MMMM YYYY')} · {startedBooking.dropOffTime}</p>
                                                <b className="">{startedBooking.selectedProvince.label} - {startedBooking.selectedRegency.label}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-primary text-primary-content w-96 mb-5">
                                <div className="card-body">
                                    <h2 className="card-title">Car price breakdown  </h2>
                                    <div>
                                        <p>Car hire charge : <b>IDR {formatRupiah(price)}</b></p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => BookNow()}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Book Now
                            </button>

                        </div>
                    </div>

                </div>
            </div>

        </LayoutService >
    );
}
