import React from 'react'
import { Form, Button, Image, Col } from 'react-bootstrap'
import arrow from '../icons/arrow.svg'
import style from './navienFrom.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { prevForm } from '../actions/Stateaction'
const NavienFrom = ({ disabledNext }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.State)
    localStorage.setItem('stateForm', JSON.stringify(state))
    return (
        <Form.Row>
            <Form.Group as={Col} md={12} sm={12} className='mt-3'  >
                <Button className='float-left' variant='outline-success'

                    disabled={disabledNext} type='submit'  >
                    <span> مرحله بعد</span>
                    <Image className={`${style.arrownext} mr-2`} src={arrow} />
                </Button>
                <Button className='float-right' variant='outline-success'
                    onClick={() => dispatch(prevForm())}   >
                    <Image className={`${style.arrowback} ml-2`} src={arrow} />
                    <span>بازگشت</span>
                </Button>
            </Form.Group>
        </Form.Row>
    )
}

export default NavienFrom