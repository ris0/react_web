import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Root from './routes/Root'
import HomeRoutes from './routes/Home'
import getCategories from './routes/Categories'
import getVideos from './routes/Videos'

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
        <Route path="categories/:categoryName" getComponents={getCategories} />
        <Route path="videos/:videoId" getComponent={getVideos}>
            <IndexRoute component={Placeholder} />
        </Route>
    </Route>
)

export default routes
