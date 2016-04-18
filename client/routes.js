import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Root from './routes/Root'
import HomeRoutes from './routes/Home'
import getCategories from './routes/Categories'
import getVideos from './routes/Videos'

if (typeof(window) === 'undefined') {
    global.window = new Object()
}

class Placeholder extends React.Component {
    constructor() {
        super()
    }

    render() {
        return <h5>Placeholder...</h5>
    }
}

const routes = (
    <Route path="/" component={Root}>
        <IndexRoute components={HomeRoutes} />
        <Route path="home" components={HomeRoutes} />
        <Route path="about" components={{ main: Placeholder }} />
        <Route path="categories/:categoryName/:categoryId" getComponents={getCategories} />
        <Route path="videos/:videoId" getComponent={getVideos} onEnter={() => window.scrollTo && window.scrollTo(0, 0)}/>
    </Route>
)

export default routes
