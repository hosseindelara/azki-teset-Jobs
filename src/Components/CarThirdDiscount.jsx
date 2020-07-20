import React, { useEffect, useState } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'
import Axios from 'axios'
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';
import { resert } from '../actions/Stateaction';
const CarThirdDiscount = () => {
    const defaultform = JSON.parse(localStorage.getItem('formoffer'))
    const [arrydata, setarrydata] = useState([])
    const [valueOffersales, setvalueOffersales] = useState(defaultform ? defaultform.sales : '')
    const [valueOfferDriver, setvalueOfferDriver] = useState(defaultform ? defaultform.driver : '')
    const [disebelmodal, setDisebelmodal] = useState(true)
    const dispatch = useDispatch()
    const handelOfferSales = event => setvalueOffersales(event.target.value)
    const handelOfferDriver = e => {
        valueOffersales.length > 1 ? setvalueOfferDriver(e.target.value) : setvalueOfferDriver('')
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setDisebelmodal(
            valueOffersales.length > 1 ?
                valueOfferDriver.length > 1 ? false : true
                : true
        )

    }, [valueOffersales, valueOfferDriver])

    useEffect(() => {
        try {
            Axios.get('https://bimename.com/bimename/core/data/car-third-discount')
                .then((respans) => setarrydata(respans.data.result))
                .catch(err => console.log(err))
        }
        catch (error) { console.log(error) }
    }, [])

    const objectsotrige = {
        sales: valueOffersales,
        driver: valueOfferDriver
    }

    const handelForm = (e) => {
        e.preventDefault()
        handleShow()
        localStorage.setItem('formoffer', JSON.stringify(objectsotrige))
    }
    const handelreset = () => {
        handleClose()
        dispatch(resert(2))
        localStorage.setItem('stateForm', JSON.stringify(2))
    }
    const FullUsename = JSON.parse(localStorage.getItem('username'))
    const car = JSON.parse(localStorage.getItem('formcar'))
    const company = JSON.parse(localStorage.getItem('formCompany'))
    return (
        <>

            <h1 className=' mt-5 mb-5 titleForm' >
                بیمه شخص ثالث
             </h1>
            <Col md={7} sm={12} className='FormSecones'>
                <p>درصد تخفیف بیمه شخص ثالث و حوادث راننده را وارد کنید</p>
                {
                    arrydata.length > 0 ?
                        <Form onSubmit={handelForm} >
                            <Form.Row>
                                <Form.Group as={Col} md={12} sm={12} >
                                    <Form.Control as="select" name='cartype'
                                        onChange={handelOfferSales}
                                        value={valueOffersales}
                                    >
                                        <option value='' >درصد تخفیف ثالث</option>
                                        {
                                            arrydata.length > 0 ? arrydata.map(item => {
                                                return <option
                                                    key={item.id.toString()}
                                                    value={item.title}
                                                > {item.title}</option>
                                            }) : <option>درصد تخفیف یافت نشد</option>

                                        }
                                    </Form.Control>

                                </Form.Group>
                                <Form.Group as={Col} md={12} sm={12} >
                                    <Form.Control as="select" name='cartype'
                                        disabled={valueOffersales.length > 1 ? false : true}
                                        onChange={handelOfferDriver}
                                        value={valueOfferDriver}
                                    >
                                        <option value='' >درصد تخفیف حوادث راننده</option>
                                        {
                                            arrydata.length > 0 ? arrydata.map(item => {
                                                return <option
                                                    key={item.id.toString()}
                                                    value={item.title}
                                                > {item.title}</option>
                                            }) : <option>درصد تخفیف یافت نشد</option>

                                        }
                                    </Form.Control>

                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md={12} sm={12} className='mt-3'  >
                                    <Button className='float-left'
                                        type='submit'
                                        disabled={disebelmodal}
                                        variant='outline-success' >استعلام قیمت</Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        : <ReactLoading type='bars' color='#25b79b' />
                }
            </Col>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>اطلاعات وارد شده</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>نام و نام خانوادگی :</b>{FullUsename ? FullUsename : 'وارد نشده'}</p>
                    <p><b>نوع خودرو : </b>{" "}{car ? car.model : 'وارد نشده'}</p>
                    <p><b>مدل خودرو : </b>{" "}{car ? car.brand : 'وارد نشده'}</p>
                    <p><b>شرکت بیمه قبلی :</b>{" "}{company ? company : 'وارد نشده'} </p>
                    <p><b>درصد تخفیف ثالث:</b>{" "}{defaultform ? defaultform.sales : 'وارد نشده'}</p>
                    <p><b>درصد تخفیف حوادث راننده:</b>{" "}{defaultform ? defaultform.driver : 'وارد نشده'}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handelreset}>
                        ثبت مجدد فرم
                     </Button>
                    <Button variant="primary" onClick={handleClose}>
                        تایید
                     </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CarThirdDiscount