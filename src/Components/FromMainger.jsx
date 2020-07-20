import React, { Suspense, lazy } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { resert } from '../actions/Stateaction'
import ReactLoading from 'react-loading';
const LoginPage = lazy(() => import('./LoginPage'));
const InsureSelect = lazy(() => import('./InsureSelect'));
const ModelCar = lazy(() => import('./ModelCar'));
const InsuranceCompany = lazy(() => import('./InsuranceCompany'));
const CarThirdDiscount = lazy(() => import('./CarThirdDiscount'));

const FromMainger = () => {
    const state = useSelector(state => state.State)
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)
    const username = useSelector(state => state.username)
    let Form = <LoginPage />
    switch (state) {
        case 1:
            Form = <LoginPage />
            break;
        case 2:
            login ? username.length > 1 ?
                Form = <InsureSelect /> : dispatch(resert(1))
                : dispatch(resert(1))
            break;
        case 3:
            Form = <ModelCar />
            break;
        case 4:
            Form = <InsuranceCompany />
            break;
        case 5:
            Form = <CarThirdDiscount />
            break;
        default:
            break;
    }

    return (
        <>
            <Suspense
                fallback={<ReactLoading type='bars' color='#25b79b' height='200' width='70%' />}>
                {Form}
            </Suspense>
        </>
    )
}

export default FromMainger