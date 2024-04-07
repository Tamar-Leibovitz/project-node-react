
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useAddNewProdToBasketMutation, useChangeQuantityOfProdMutation, useDeleteProdMutation, useGetAllCartQuery } from "../features/basket/basketApiSlice"
import { InputNumber } from 'primereact/inputnumber';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function BasketDesign() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate()

    const { data: allCart, isLoading, isError, error, isSuccess, refetch } = useGetAllCartQuery()

    const [changeQuantity, { isError2, error2, isSuccess: isSuccess2, data2 }] = useChangeQuantityOfProdMutation()

    const [deleteProd, { isError3, error3, isSuccess: isSuccess3, data3 }] = useDeleteProdMutation()

    const [price,setPrice] = useState(1)

    const cart = JSON.parse(localStorage.getItem('cart')) || []

    // console.log("after seclaring",cart);

    // useChangeQuantityOfProdMutation
    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));

            if (isSuccess) {
                setProducts(allCart)
                // console.log(allCart);
            }
            else
                console.log("loading basket view");
        }
        else {
            console.log("JSON.parse(localStorage.getItem('cart'))");
            setProducts(JSON.parse(localStorage.getItem('cart')))
        }


        if (isSuccess2 || isSuccess3) {
            refetch()
            // navigate("/BasketDesign")
        }
        else
            console.log("loading basket view");



    }, [isSuccess, isSuccess2, isSuccess3]);

    const handleChangeQty = (e, product) => {
        if (localStorage.getItem('token')) {
            changeQuantity({ "id": product._id, "quantity": e.value })
        }
        else{
            if(cart.length>0){
                cart.forEach((e2)=>
                {
                    console.log("handleCangeQty");
                    if(e2._id == product._id){
                        let price = e2.price / e2.qty
                        e2.qty = e.value
                        e2.price = price * e2.qty
                    }
                })  
            }
          
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        setPrice(1)
    }

    const functionThatReturnFromStorageTheQtyOfThisProd = (product)=>{
        let quantity;
        if(cart.length>0){
            cart.forEach((e2)=>
            {
                if(e2._id == product._id)
                {
                    console.log("e2.qty: ",e2.qty);
                    quantity = e2.qty
                    return 

                }
            })  
        }
        return quantity
    }


    const itemTemplate = (product, index) => {
       console.log("product.prodId.image",product.prodId.image);
        return (
            <div className="col-12" key={product.id} >
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {localStorage.getItem('token') ?
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${product.prodId.image}`} alt={product.name} /> :
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${product.image}`} alt={product.name} />
                    }
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            {localStorage.getItem('token') ?
                                <div className="text-2xl font-bold text-900">{product.prodId.name}</div> :
                                <div className="text-2xl font-bold text-900">{product.name}</div>}
                            <div className="flex-auto">
                                <label htmlFor="change quantity" className="font-bold block mb-2">change quantity</label>
                                <InputNumber inputId="change quantity" value={ localStorage.getItem('token') ?product.quantity:functionThatReturnFromStorageTheQtyOfThisProd(product)} onValueChange={(e) => handleChangeQty(e, product)} mode="decimal" showButtons min={1} max={100} />
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{product.price}</span>
                            <br></br>
                            <Button onClick={() => localStorage.getItem('token') ? deleteProd({ id: product._id }) : deleteProdFromStorage(product)} icon="pi pi-trash" className="p-button-rounded" ></Button>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });


        return <div className="grid grid-nogutter">{list}</div>;
    };

    const deleteProdFromStorage = (product) => {
        // debugger
        const a = JSON.parse(localStorage.getItem('cart'))
        const newProductsArray = a.filter((prod) => prod._id !== product._id);
        localStorage.setItem('cart', JSON.stringify(newProductsArray))
        setProducts(JSON.parse(localStorage.getItem("cart")))


    }



    return (
        <>
        {/* <button onClick={()=>{navigate("/PaymentDetails")}}>לסגירת הזמנה</button> */}

        <div className="card" style={{ width: 1000, margin: "Auto" }}>
            <DataView value={products} listTemplate={listTemplate} />
            {/* paginator rows={5} */}
        </div>
    </>)
}