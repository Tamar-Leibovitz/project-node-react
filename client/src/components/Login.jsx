import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { AutoComplete } from "primereact/autocomplete";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputText } from 'primereact/inputtext';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { setToken } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch()
    
    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()

    const toast = useRef(null);
    const [items, setItems] = useState([]);
    const defaultValues = { userName: '', password: '' };

    const form = useForm({ defaultValues });
    const errors = form.formState.errors;

    // const show = () => {
    //     toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: form.getValues('value') });
    // };

    const search = (event) => {
        setItems([...Array(10).keys()].map((item) => event.query + '-' + item));
    };

    const onSubmit = (data) => {
        // console.log("onSubmit",data);
        loginFunc(data)
        // data.value 
        // // && show();
        form.reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            // navigate("/blogs")
            alert("Success login")
        }
        if(isError){
            alert(error.data )
        }
    }, [isSuccess])

    return (
        <div className="card flex justify-content-center">
            <br></br> <br></br>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Toast ref={toast} />
                <Controller
                    name="userName"
                    control={form.control}
                    rules={{ required: 'userName is required!' }}
                    render={({ field, fieldState }) => (
                        <>
                            {/* <label htmlFor={field.name}>
                                {/* Value */
                            /* </label> */}
                            <InputText placeholder="userName" inputId={field.name} value={field.value} onChange={(e)=>field.onChange(e.target.value)}
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
                            <InputText type="password" placeholder="password" inputId={field.name} value={field.value} onChange={field.onChange}
                                inputRef={field.ref} suggestions={items} completeMethod={search} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}<br></br><br></br>
                        </>
                    )}
                />
                <Button label="login" type="submit" icon="pi pi-check" style={{ backgroundColor: 'black' }} />

            </form>
        </div>
    )
}

export default Login
