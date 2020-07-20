import React from 'react'
import { Navbar, Image, Nav } from 'react-bootstrap'
import logo from '../icons/logo.svg'
import Usericon from '../icons/user.svg'
import { useSelector } from 'react-redux'

const NavbarMneu = () => {


    const login = useSelector(state => state.login)
    const username = useSelector(state => state.username)

    return (
        <Navbar>
            <Navbar.Brand href='/' >
                <Image src={logo} />
            </Navbar.Brand>
            <Nav.Item className='Nameapp d-none d-md-block ' >
                <p className='text-center justify-content-center align-items-center'>
                    سامانه مقایسه و خرید آنلاین بیمه
                </p>
            </Nav.Item>
            <Nav.Link className="LoginBtn">
                {
                    login ?
                        username.length > 1 ?
                            <p><Image src={Usericon} className="userIcon" />{" "}{username}</p>
                            : <p>نام و نام خانوادگی وارد نشده</p>
                        : <p>ثبت نام</p>
                }
            </Nav.Link>
        </Navbar>
    )
}

export default NavbarMneu