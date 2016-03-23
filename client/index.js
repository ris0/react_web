import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import Root from './routes/Root';
import Home from './routes/Home';
import getCategories from './routes/Categories';
import Categories from './routes/Categories/handlers/Categories';

render((
    <Router history={browserHistory}>
        <Route path="/" component={Root}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home} />
            <Route path="categories" getComponent={getCategories} />
        </Route>
    </Router>), document.getElementById('app'));
