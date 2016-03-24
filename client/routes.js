import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Root from './routes/Root';
import Home from './routes/Home';
import getCategories from './routes/Categories';
import getVideos from './routes/Videos';

class Placeholder extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <h5>Placeholder...</h5>
    }
}

const routes = (
    <Route path="/" component={Root}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="about" component={Placeholder} />
        <Route path="categories" getComponent={getCategories} />
        <Route path="videos/:video_id" getComponent={getVideos}>
            <IndexRoute component={Placeholder} />
        </Route>
    </Route>
);

export default routes;
