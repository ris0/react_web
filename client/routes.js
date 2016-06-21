import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Root from './routes/Root'
import HomeRoutes from './routes/Home'
import getCategories from './routes/Categories'
import getVideos from './routes/Videos'
import getAbout from './routes/About'
import getJobs from './routes/Jobs'

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
        <Route path="categories/:categoryName/:categoryId" getComponents={getCategories} onEnter={() => window.scrollTo && window.scrollTo(0, 0)}/>
        <Route path="videos/:videoId" getComponent={getVideos} onEnter={() => window.scrollTo && window.scrollTo(0, 0)}/>
        <Route path="about" getComponents={getAbout} />
        <Route path="jobs" getComponents={getJobs} />
    </Route>
)

export default routes
