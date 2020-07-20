import React, { useState, useEffect } from 'react'
import NavienFrom from './NavienFrom'
import Axios from 'axios'
import { Col, Form } from 'react-bootstrap'
import ReactLoading from 'react-loading';
import { nextForm } from '../actions/Stateaction';
import { useDispatch } from 'react-redux';

const InsuranceCompany = () => {
    const defaultform = JSON.parse(localStorage.getItem('formCompany'))
    const [arrydata, setarrydata] = useState([])
    const [valuecInsuranceCompany, setvaluecInsuranceCompany] = useState(defaultform ? defaultform : '')
    const handelInsuranceCompany = event => setvaluecInsuranceCompany(event.target.value)


    useEffect(() => {
        try {
            Axios.get('https://bimename.com/bimename/core/data/companies')
                .then((respans) => setarrydata(respans.data.result))
                .catch(err => console.log(err))
        }
        catch (error) { console.log(error) }
    }, [])

    const dispatch = useDispatch()
    const handelForm = (e) => {
        e.preventDefault()
        dispatch(nextForm())
        localStorage.setItem('formCompany', JSON.stringify(valuecInsuranceCompany))
    }
    return (
        <>

            <h1 className=' mt-5 mb-5 titleForm' >
                بیمه شخص ثالث
             </h1>
            <Col md={7} sm={12} className='FormSecones'>
                <p>شرکت بیمه گر قبلی خود را وارد کنید</p>
                {
                    arrydata.length > 0 ?
                        <Form onSubmit={handelForm}>
                            <Form.Row>
                                <Form.Group as={Col} md={12} sm={12} >
                                    <Form.Control as="select" name='cartype'
                                        onChange={handelInsuranceCompany}
                                        value={valuecInsuranceCompany}
                                    >
                                        <option value='' >شرکت بیمه گر قبلی</option>

                                        {
                                            arrydata.length > 0 ? arrydata.map(item => {
                                                return <option
                                                    key={item.id.toString()}
                                                    value={item.company}
                                                > {item.company}</option>
                                            }) : <option>شرکت یافت نشد</option>

                                        }
                                    </Form.Control>

                                </Form.Group>

                            </Form.Row>
                            <NavienFrom
                                disabledNext={valuecInsuranceCompany.length ? false : true}
                            />
                        </Form>
                        : <ReactLoading type='bars' color='#25b79b' />
                }
            </Col>

        </>
    )
}

export default InsuranceCompany