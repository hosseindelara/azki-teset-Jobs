import React, { useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import NavienFrom from './NavienFrom'
import Axios from 'axios'
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';
import { nextForm } from '../actions/Stateaction';
const ModelCar = () => {
    const defaultform = JSON.parse(localStorage.getItem('formcar'))
    const [arrydata, setarrydata] = useState([])
    const [valuecarModel, setValuecarModel] = useState(defaultform ? defaultform.model : '')
    const [valueBrandCar, setValueBrandCar] = useState(defaultform ? defaultform.brand : '')
    const [next, setNext] = useState(true)
    const dispatch = useDispatch()

    const handelCarModel = event => setValuecarModel(event.target.value)
    const handelBrandCare = event => {
        valuecarModel.length > 1 ? setValueBrandCar(event.target.value) : setValueBrandCar('')
    }

    useEffect(() => {
        setNext(
            valuecarModel.length > 1 ?
                valueBrandCar.length > 1 ? false : true
                : true
        )

    }, [valueBrandCar, valuecarModel])

    useEffect(() => {
        try {
            Axios.get('https://bimename.com/bimename/core/data/third-car-types')
                .then((respans) => setarrydata(respans.data.result))
                .catch(err => console.log(err))
        }
        catch (error) { console.log(error) }
    }, [])
    const objectOut = {
        model: valuecarModel,
        brand: valueBrandCar
    }

    const handelForm = (e) => {
        e.preventDefault()
        dispatch(nextForm())
        localStorage.setItem('formcar', JSON.stringify(objectOut))
    }

    return (
        <>
            <h1 className=' mt-5 mb-5 titleForm' >
                بیمه شخص ثالث
             </h1>
            <Col md={7} sm={12} className='FormSecones'>
                <p>نوع و مدل خودروی خود را انخاب کنید</p>
                {
                    arrydata.length > 0 ?
                        <Form onSubmit={handelForm} >
                            <Form.Row>
                                <Form.Group as={Col} md={6} sm={12} >
                                    <Form.Control as="select" name='cartype'
                                        onChange={handelCarModel}
                                        defaultValue={valuecarModel}
                                    >
                                        <option value='' >نوع خودرو</option>

                                        {
                                            arrydata.length ? arrydata.map(item => {
                                                return <option
                                                    key={item.carTypeID.toString()}
                                                    value={item.carType}
                                                > {item.carType}</option>
                                            }) : <option value='' >نوع خودروی یافت نشد</option>

                                        }
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md={6} sm={12} >
                                    <Form.Control as="select" name="carBrand"
                                        disabled={valuecarModel.length ? false : true}
                                        onChange={handelBrandCare}
                                        defaultValue={valueBrandCar}
                                    >
                                        <option value='' >مدل خودرو</option>
                                        {
                                            valuecarModel.length > 0 ?
                                                arrydata.filter(item => item.carType === valuecarModel)
                                                    .map(item => (
                                                        item.brand.map(item => (
                                                            <option
                                                                key={item.id.toString()}
                                                                value={item.name}>{item.name}
                                                            </option>
                                                        ))
                                                    ))
                                                : <option value='' >مدل خودرو یافت نشد</option>
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <NavienFrom disabledNext={next} />
                        </Form>
                        : <ReactLoading type='bars' color='#25b79b' />
                }
            </Col>
        </>
    )
}

export default ModelCar