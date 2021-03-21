  
import React from 'react';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import AppointmentPage from '../pages/Appointment/AppointmentPage';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import LogoutPage from '../pages/Login/LogoutPage';
import DashboardLayout from './DashboardLayout';

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route path="/">
                    <DashboardLayout>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/appointment" component={AppointmentPage}/>
                            <Route exact path="/logout" component={LogoutPage} />
                        </Switch>
                    </DashboardLayout>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default AppRouter;