import React from 'react'
import { Col, Button, Image } from 'react-bootstrap'
import insurance from '../icons/insurance.svg'
import style from './InsureSelect.module.scss'
import { nextForm } from '../actions/Stateaction'
import { useDispatch } from 'react-redux'
const InsureSelect = () => {
    const dispatch = useDispatch()
    return (
        <>
            <h1 className=' mt-5 mb-5 titleForm' >
                انتخاب بیمه
             </h1>
            <Col md={7} sm={12} className='text-center FormSecones align-items-center justify-content-center' >
                <Button variant='outline-secondary'
                    onClick={() => dispatch(nextForm())}
                    className={style.btnInsureSelect}  >
                    <Image src={insurance} />
                    <span>
                        شخض ثالث
                   </span>
                </Button>
                <Button variant='outline-secondary' className={`${style.btnInsureSelect} mr-5`} disabled >
                    <Image src={insurance} />
                    <span>
                        بدنه
                   </span>
                </Button>

            </Col>

        </>
    )
}

export default InsureSelect