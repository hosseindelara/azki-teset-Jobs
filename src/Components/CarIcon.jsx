import React, { memo } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import cargreen from '../icons/car-green.svg'
const CarIcon = () => {
    return (
        <Row>
            <Col sm={12} md={12}  >
                <Image src={cargreen} className="float-left cardIcon" rounded />
                <span className='imgeBackgerandMolie' ></span>
            </Col>
        </Row>
    )
}

export default memo(CarIcon)