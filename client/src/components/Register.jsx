import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { AutoComplete } from "primereact/autocomplete";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from 'primereact/inputtext';
//עדכון הטופס מול השרת
import { useRegisterMutation } from '../features/auth/authApiSlice';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Password } from 'primereact/password';

const Register = () => {
    console.log("Register");
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()

    const toast = useRef(null);
    // const toast2 = useRef(null);
    const [items, setItems] = useState([]);
    const defaultValues = { userName: '', password: '', name: 'cv b', email: '', phone: '', address: ''};

    const form = useForm({ defaultValues });
    const errors = form.formState.errors;

    // const show = () => {
    //     toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: form.getValues('value') });
    // };



    const search = (event) => {
        setItems([...Array(10).keys()].map((item) => event.query + '-' + item));
    };

    const onSubmit = (data) => {
        // data.value 
        // // && show();
        // console.log(data);
        registerFunc(data);
        form.reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        //password,name,email,phone,address
        <div className="card flex justify-content-center">
            <br></br> <br></br>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Toast ref={toast} />
                {/* input value-username */}
                <Controller
                    name="userName"
                    control={form.control}
                    rules={{ required: 'userName is required!' }}
                    render={({ field, fieldState }) => (
                        <>
                            {/* <label htmlFor={field.name}>
                                {/* Value */
                            /* </label> */}
                            <InputText placeholder="userName" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />
                {/* input value-password */}
                <Controller
                    name="password"

                    control={form.control}
                    rules={{ required: 'password is required!' }}
                    render={({ field, fieldState }) => (
                        <>
                            <Password toggleMask type="password" placeholder="password" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    rules={{ required: 'email is required!' }}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText placeholder="email" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />
                <Controller
                    name="phone"

                    control={form.control}
                    render={({ field, fieldState }) => (
                        <>
                            <InputText placeholder="phone" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />

                <Controller
                    name="address"

                    control={form.control}
                    render={({ field, fieldState }) => (
                        <>
                            {/* <InputText type="address" placeholder="address" inputId={field.name} value={field.value} onChange={field.onChange}
                             inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br> */}
                            <Accordion activeIndex={0} >
                                <AccordionTab header="address" style={{ width: 200 }}>
                                    <InputText placeholder="city" style={{ width: 150 }} />
                                    <InputText placeholder="street" style={{ width: 150 }} />
                                    <InputText placeholder="building number" style={{ width: 150 }} />
                                </AccordionTab>
                            </Accordion>
                        </>
                    )}
                />
                {console.log("before button")}
                <br/>
                <br/>
                <Button label="register" type="submit" icon="pi pi-check" style={{ backgroundColor: 'black' }} />
                {/* onClick={()=>{registerFunc(data)}} */}

            </form>
        </div>
    )
}

export default Register
