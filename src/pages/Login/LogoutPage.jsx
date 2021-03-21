import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Redirect} from "react-router-dom";
import { setLoggedIn } from '../../store/reducers/userSlice';
const LogoutPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoggedIn(false));
    }, [])
    return (
        <div>
            <Redirect to="/login"/>
        </div>
    );
}

export default LogoutPage;