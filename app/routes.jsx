import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'

import HomeWrap from './component/HomeWrap';
import Home from './component/page/Home';

import About from './component/page/About';
import Custcases from './component/page/Custcases';
import Custcase from './component/page/Custcase';
import Thought from './component/page/Thought';
import Service from './component/page/Service';
import Articles from './component/page/Articles';
import Article from './component/page/Article';
import Contact from './component/page/Contact';


const routes = (
    <HashRouter>
        <Switch>
            <Route path='/' children={() => (
                <HomeWrap>
                    <Switch>

                        <Route path='/' exact component={Home}/>
                        <Route path='/about' exact component={About}/>
                        <Route path='/custcases' exact component={Custcases}/>
                        <Route path='/custcase/:id' exact component={Custcase}/>
                        <Route path='/thought' exact component={Thought}/>
                        <Route path='/service' exact component={Service}/>
                        <Route path='/articles' exact component={Articles}/>
                        <Route path='/article/:id' exact component={Article}/>
                        <Route path='/contact' exact component={Contact}/>

                    </Switch>
                </HomeWrap>
            )}>
            </Route>

        </Switch>
    </HashRouter>
);


export default routes;
