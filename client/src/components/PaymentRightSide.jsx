import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { useCreateNewOrderMutation } from '../features/manager/managOrderApiSlice'
import useAuth from '../hooks/useAuth'
import { useGetAllCartQuery } from '../features/basket/basketApiSlice';
import { Accordion, AccordionTab } from 'primereact/accordion';

const PaymentRightSide = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneUpdate, setPhone] = useState('');
    const [emailUpdate, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [buildingNumber, setbuildingNumber] = useState('');


    const [createOrd, { isError, error, isSuccess }] = useCreateNewOrderMutation()
    const { data: allCart, isLoading, isError: isError2, error: error2, isSuccess: isSuccess2, refetch } = useGetAllCartQuery()

    let totalPrice = 0
    // addProdToBasket({ "prodId": product._id })


    useEffect(() => {
        if (isSuccess2) {
            allCart.map((item) => totalPrice += item.price)
        }
    }, [isSuccess2]);

    const createOrder = () => {
        // setAddress("")
        console.log("allCart: ",allCart);
        console.log("on createOrder", { userId: _id, products: allCart, price: totalPrice, date: new Date() });
        createOrd({ userId: _id, products: allCart, price: totalPrice,address:city+' '+street+' '+buildingNumber, date: new Date(),message })
    }

    const { _id, userName, name, email, phone, isAdmin, isUser } = useAuth()

    return (
        <>
            <div className="align-items-center card field grid justify-content-center" style={{border:'1px solid #3293c0', width:'70%', height:'95%'}}>
                <div className='w-full'>
                <InputText type="text" placeholder="שם פרטי" defaultValue={name} style={{direction:'rtl'}} onChange={(e) => setFirstName(e.target.value)} />
                {/* </div> */}</div>
                <br/><br/><br/>
                {/* <div className="   w-full"> */}
                <div className='w-full'>

                <InputText type="text" placeholder="שם משפחה" defaultValue={firstName} style={{direction:'rtl'}}onChange={(e) => setLastName(e.target.value)} /><br></br><br></br>
                {/* </div> */}
                </div>
                <div className='w-full'>

                <InputText type="text" placeholder="טלפון" defaultValue={phone} style={{ width: 300 ,direction:'rtl'}} onChange={(e) => setPhone(e.target.value)} /><br></br><br></br>
                </div>
                <div className='w-full'>
                <InputText type="text" placeholder="אימייל" defaultValue={email} style={{ width: 300 ,direction:'rtl'}} onChange={(e) => setEmail(e.target.value)} /><br></br><br></br>
                </div>
               
                <div style={{ right: 1000 }}>
                <Accordion activeIndex={0} >
                    <AccordionTab header="כתובת" style={{ width: 200 }}>
                        <InputText placeholder="עיר" style={{ width: 150 }} onChange={(e) => setCity(e.target.value)} />
                        <InputText placeholder="רחוב" style={{ width: 150 }} onChange={(e) => setStreet(e.target.value)}/>
                        <InputText placeholder="מספר בנין " style={{ width: 150 }} onChange={(e) => setbuildingNumber(e.target.value)}/>
                    </AccordionTab>
                </Accordion><br></br>
                </div>
                <div className='w-full'>
                </div>
                    <InputTextarea id="message" placeholder="הערות על ההזמנה" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} cols={30} /><br></br><br></br>
                <div className='w-full'>
                <br></br>
                <Button onClick={() => { createOrder() }}>שליחת ההזמנה</Button>
                </div>
                {/* tooltipOptions={{ position: 'left' }} */}
            </div>
            {/* </mycard> */}
        </>

    )
}
export default PaymentRightSide

