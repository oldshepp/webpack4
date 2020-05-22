import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Layout from './view/layout/index';
import Home from './view/home/index';
import Detail from './view/detail/index';
import Shopp from './view/shopp/index';

const router=(
   <BrowserRouter>
        <Layout>
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/detail" exact component={Detail} />
                <Route path="/shopp" exact component={Shopp} />
                <Redirect from="/" to="/home" exact/>
            </Switch>
        </Layout>
   </BrowserRouter> 
);

export default router