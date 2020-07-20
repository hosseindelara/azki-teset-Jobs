import React, { useState, useEffect } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { nextForm } from '../actions/Stateaction'
import { Loginusername } from '../actions/usernameaction'
import { Loginuser } from '../actions/Loginaction'
const LoginPage = () => {
    const [valuename, setValuename] = useState('')
    const [valueFamily, setValueFamily] = useState('')
    const [ValuePhone, setValuePhone] = useState('')
    const [valuePassword, setValuePassword] = useState('')
    const [errorname, seterrorname] = useState('')
    const [errorFamily, seterrorFamily] = useState('')
    const [errorPhone, seterrorPhone] = useState('')
    const [errorPassword, seterrorPassword] = useState('')
    const [disablSubmit, setdisablSubmit] = useState(true)
    const dispatch = useDispatch()


    const pattenrphone = new RegExp(/^(0|0098|\+98)9\d{8}$/);
    const pattenrnameAndFamily = new RegExp(/^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u0020\u2000-\u200F\u2028-\u202F\u06A9\u06AF\u06BE\u06CC\u0629\u0643\u0649-\u064B\u064D\u06D5\s]+$/);

    const handelInput = (event) => {
        switch (event.target.name) {
            case "name":
                setValuename(event.target.value)
                valuename.length > 2 ?
                    pattenrnameAndFamily.test(valuename) ?
                        seterrorname('نام قابل ثبت است')
                        : seterrorname("فقط نام فارسی قابل ثبت است")
                    : seterrorname('حداقل 3 کارکتر')
                break;
            case "Family":
                setValueFamily(event.target.value)
                valueFamily.length > 2 ?
                    pattenrnameAndFamily.test(valueFamily) ?
                        seterrorFamily('فامیلی قابل ثبت است')
                        : seterrorFamily('فقط فامیلی به فارسی قابل ثبت است')
                    : seterrorFamily('حداقل 3 کارکتر')
                break;
            case "mobile":
                setValuePhone(event.target.value)
                ValuePhone.length > 7 ?
                    pattenrphone.test(ValuePhone) ?
                        seterrorPhone('شماره موبایل قابل ثبت است')
                        : seterrorPhone('فرمت شماره موبایل قابل قبول نیست')
                    : seterrorPhone('شماره موبایل را کامل وارد کنید')
                break;
            case 'password':
                setValuePassword(event.target.value)
                valuePassword.length < 3 ?
                    seterrorPassword('پسورد باید حداقل 4 کارکتر باشد')
                    : valuePassword.length > 9 ?
                        seterrorPassword("پسورد بزرگتر از 10 قابل قبول نیست")
                        : seterrorPassword("پسورد قابل ثبت است")
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setdisablSubmit(errorname === 'نام قابل ثبت است' && errorFamily === 'فامیلی قابل ثبت است' && errorPhone === 'شماره موبایل قابل ثبت است' && errorPassword === "پسورد قابل ثبت است" ? false : true)

    }, [errorname, errorFamily, errorPhone, errorPassword])



    const handelSubmit = (e) => {
        e.preventDefault()
        dispatch(nextForm())
        localStorage.setItem('LoginUser', JSON.stringify(true))
        localStorage.setItem('username', JSON.stringify(`${valuename} ${valueFamily}`))
        dispatch(Loginusername(`${valuename} ${valueFamily}`))
        dispatch(Loginuser())
    }
    return (
        <>
            <h1 className=' mt-5 mb-5 titleForm' >
                ثبت نام
             </h1>
            <Col md={7} sm={12} className='FormSecones' >
                <Form onSubmit={handelSubmit} >
                    <Form.Row>
                        <Form.Group as={Col} md={6} sm={12} >
                            <Form.Control type='text' name='name'
                                defaultValue={valuename} onChange={handelInput}
                                placeholder='نام' />
                            <span>{errorname}</span>
                        </Form.Group>
                        <Form.Group as={Col} md={6} sm={12} >
                            <Form.Control type='text' name="Family" defaultValue={valueFamily}
                                onChange={handelInput}
                                placeholder='نام خانوادگی' />
                            <span>{errorFamily}</span>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md={12} sm={12} >
                            <Form.Control type='number' name='mobile' defaultValue={ValuePhone}
                                onChange={handelInput}
                                placeholder='شماره موبایل' />
                            <span>{errorPhone}</span>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md={12} sm={12} >
                            <Form.Control type='password' name='password'
                                onChange={handelInput}
                                defaultValue={valuePassword} placeholder='رمز عبور' />
                            <span>{errorPassword}</span>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md={12} sm={12} >
                            <Button className='float-left' variant='outline-success'
                                type='submit' disabled={disablSubmit} >
                                ثبت نام
                                </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Col>
        </>
    )
}

export default LoginPage