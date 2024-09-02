import { useEffect, useState } from "react";
import LayoutService from "../layouts/LayoutService";
import { findCarById } from "../../api/cars";
import { useParams } from "react-router-dom";
import { Accordion, Label, Radio } from "flowbite-react";
import Stepper from "../components/Stepper";

export default function DetailForRent() {
    const { id } = useParams()
    const [car, setCar] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('bca')


    useEffect(() => {
        findCarById(id).then((res) => setCar(res.data));
    }, [])



    const BookNow = async () => {
        if (paymentMethod == '') {
            alert('select payment method')
            return
        }

        try {
            let payload = {
                bank: paymentMethod,
                detailCar: car
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

            <div className="w-full flex px-20">
                <div className="w-4/6 ">
                    <Stepper />
                    <div>
                        <div
                            href="#"
                            className="flex flex-col items-center bg-white border mb-5 border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <img
                                className="object-cover w-full rounded-t-lg  h-[500px] md:h-auto md:w-[300px] md:rounded-none md:rounded-s-lg"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/2880px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg"
                                alt=""
                            />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {car.merk}
                                </h5>
                                <p>{car.year} {car.license_plate}</p>
                                <p className="text-2xl">IDR {car.daily_rental_price}</p>
                                <p>Jakarta - Pasar Rebo</p>
                            </div>
                        </div>


                        <div

                            className="flex flex-col items-center bg-white border mb-5 border-gray-200 rounded-lg shadow md:flex-row md:max-w-full "
                        >

                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Driver Details
                                </h5>
                                <h1></h1>
                                {/* <b>Name : </b> <p>Fahmi ichwan</p> */}
                                <p><b>Name : </b> Fahmi ichwa</p>
                                <p><b>Email : </b> Fahmi ichwa</p>
                                <p><b>Phone number: </b> Fahmi ichwa</p>
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
                                <h1>Total Price</h1>  <p>Rp. 813.000</p>
                            </div>
                            <div>
                                {/* <button onClick={pay} className="btn btn-primary">Pay </button> */}
                            </div>
                        </div>

                        <div>
                            <div class="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" checked="checked" />
                                <div class="collapse-title text-xl font-medium">Virtual Account</div>
                                <div class="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div class="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" />
                                <div class="collapse-title text-xl font-medium">ATM/Other Banks</div>
                                <div class="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div class="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" />
                                <div class="collapse-title text-xl font-medium">Card / Debit Cards</div>
                                <div class="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                            <div class="collapse collapse-arrow bg-base-200">
                                <input type="radio" name="my-accordion-2" />
                                <div class="collapse-title text-xl font-medium">Convenience Store</div>
                                <div class="collapse-content">
                                    <p>hello</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-2/6 flex justify-end  ">



                    <div
                        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow h-[600px]"
                    >
                        <div className="flex flex-col">
                            <div className="card bg-primary text-primary-content w-96 mb-10">
                                <div className="card-body">
                                    <h2 className="card-title">Pick-up and drop-off</h2>
                                    <div className="w-full ">
                                        <div className="11/12  border-l-4 px-5">
                                            <div className="mb-10">
                                                <p>Wed, 26 Jun · 10:00</p>
                                                <b className="">Jakarta - Pasar Rebo</b>
                                            </div>
                                            <div>
                                                <p>Wed, 26 Jun · 10:00</p>
                                                <b className="">Jakarta - Pasar Rebo</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-primary text-primary-content w-96 mb-5">
                                <div className="card-body">
                                    <h2 className="card-title">Car price breakdown  </h2>
                                    <div>
                                        <p>Car hire charge : <b>IDR 3,523,919.00</b></p>
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

        </LayoutService>
    );
}
