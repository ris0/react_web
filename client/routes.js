import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Root from './routes/Root';
import Home from './routes/Home';
import getCategories from './routes/Categories';

const routes = (
    <Route path="/" component={Root}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="categories" getComponent={getCategories} />
    </Route>
);

export default routes;
