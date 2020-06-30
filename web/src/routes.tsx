import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './pages/Chat';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/chat" component={Chat} exact />
        </Switch>
    </BrowserRouter>
)

export default Routes;