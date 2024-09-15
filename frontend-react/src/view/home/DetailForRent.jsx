import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { findCarById } from "../../api/cars";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Accordion, Label, Radio } from "flowbite-react";
import Stepper from "../components/Stepper";
import { findUserById } from "../../api/users";
import Cookies from 'js-cookie';
import { TextInputEl } from "../components/TextInput";
import { useSelector } from "react-redux";
import moment from 'moment'
import { fCalculateTimeForPrice, fCalculateToHour, fMakeFormatDateTime, fFormatRupiah } from "../../utils/utils";
import { createBookNow } from "../../api/bookings";
import { paymentMethods } from "../../data/paymentMethods";

export default function DetailForRent() {
    const { id } = useParams()
    const apiUrl = import.meta.env.VITE_API_BE_URL

    const navigate = useNavigate()
    const startedBooking = useSelector((state) => state.startedBooking);

    const [car, setCar] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

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


    //  NOTED : jika lebih dari 12 jam di hitung nambah hari, jka kurang dari 12 jam di hitung hari ini saja
    let formulaQtyMidtrans = 0;
    let startDate = fMakeFormatDateTime(startedBooking.pickUpDate, startedBooking.pickUpTime)
    let endDate = fMakeFormatDateTime(startedBooking.dropOffDate, startedBooking.pickUpTime)
    const difference = fCalculateToHour(startDate, endDate);

    //utils, per 2 jam naik 1.5 
    formulaQtyMidtrans = fCalculateTimeForPrice(difference).toFixed(1)

    let price = formulaQtyMidtrans * car.daily_rental_price;

    const BookNow = async () => {

        if (paymentMethod == '') {
            alert('select payment method')
            return
        }
        setIsDisabled(true)
        try {
            const data = await createBookNow({
                bank: paymentMethod,
                carId: car.id,
                userId: userId,
                startDate: startedBooking.pickUpDate,
                endDate: startedBooking.dropOffDate,
                pickUpTime: startedBooking.pickUpTime,
                dropOffTime: startedBooking.dropOffTime,
                pickupLocation: `${startedBooking.selectedProvince.label} - ${startedBooking.selectedRegency.label}`,
            })

            navigate(`/listcar/summary?order_id=${data.data.m_order_id}&transaction_id=${data.data.m_transaction_id}`);

        } catch (error) {
            setIsDisabled(false)
            console.log(error);
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
                        <div className="flex flex-col items-center bg-white border mb-5 border-gray-200 shadow-lg rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

                            <img
                                className="object-cover w-full rounded-t-lg  h-[500px] md:h-auto md:w-[300px] md:rounded-none md:rounded-s-lg"
                                src={`${apiUrl}/uploads/` + car.file}
                                alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {car.merk}
                                </h5>
                                <p>{car.year} {car.license_plate}</p>
                                <p className="text-2xl">IDR {fFormatRupiah(car.daily_rental_price)}</p>
                                <p>{car.address}</p>
                            </div>
                        </div>


                        <div className="w-full items-center bg-white mb-5 border-gray-200 rounded-lg border shadow-lg md:flex-row md:max-w-full">
                            <div className="flex  flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Driver Details
                                </h5>

                                <div className="w-full">
                                    <div>
                                        <div className="w-full flex">
                                            <div className="w-1/3 mb-3 mr-5">
                                                <TextInputEl className={""} placeholder={"Username"} value={username || ''} handleChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                            <div className="w-1/3 mb-3 mr-5">
                                                <TextInputEl className={""} placeholder={"First name"} value={firstName || ''} handleChange={(e) => setFirstName(e.target.value)} />
                                            </div>
                                            <div className="w-1/3 mb-3">
                                                <TextInputEl className={""} placeholder={"Last name"} value={lastName || ''} handleChange={(e) => setLastName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="w-full flex">
                                            <div className="w-1/3 mb-3 mr-5">
                                                <TextInputEl className={""} placeholder={"email"} value={email || ''} handleChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="w-1/3 mb-3 mr-5">
                                                <TextInputEl className={""} placeholder={"Phone Number"} value={phoneNumber || ''} handleChange={(e) => setPhoneNumber(e.target.value)} />
                                            </div>
                                            <div className="w-1/3 mb-3">
                                                <div className="mb-4 block">
                                                    &nbsp;
                                                </div>
                                                <Link
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                                                    to="/home/profile" > Update</Link>
                                                {/* <button
                                                    type="button"
                                                disabled={isDisabled}
                                                onClick={() => BookNow()}
                                                className=""
                                                >
                                                Book Now
                                            </button> */}

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card  bg-neutral text-neutral-content border rounded-lg shadow-lg  mb-10 p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Payment Detail
                            </h5>
                            <PayemntDetailCompt setPaymentMethod={setPaymentMethod} />
                        </div>

                        <div className="w-full">
                            <div className="flex justify-between">
                                <h1>Total Price</h1>  <p>Rp. {fFormatRupiah(price)} </p>
                            </div>
                            <div>
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
                            <div className="card bg-primary text-primary-content mb-10">
                                <div className="card-body">
                                    <h2 className="card-title">Pick-up and drop-off</h2>
                                    <div className="w-ful ">
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
                                        <span>Car hire charge : <b>IDR {fFormatRupiah(price)}</b></span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                disabled={isDisabled}
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


const PayemntDetailCompt = ({ setPaymentMethod }) => {
    return (
        <Accordion>

            {paymentMethods.map((data, index) => (
                <Accordion.Panel key={index}>
                    <Accordion.Title>{data[0].category}</Accordion.Title>
                    <Accordion.Content>
                        <fieldset className="flex flex-col ">
                            {data.map((d, i) => (
                                <div key={i} className="flex items-center justify-between w-full ">
                                    <div>
                                        <Radio id={d.id} name="countries" onChange={() => setPaymentMethod(d.value)} value={d.value} className="mr-2" />
                                        <Label htmlFor={d.id}>{d.label}</Label>
                                    </div>
                                    <div className="h-10">
                                        <img
                                            className="object-cover"
                                            src={`/assets/logo-payment/` + d.imgSrc}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            ))}

                        </fieldset>
                    </Accordion.Content>
                </Accordion.Panel>
            ))}
        </Accordion>
    )
}