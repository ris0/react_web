import React from 'react'
import { jobsData }from '../test-data.js'

function Job({ data }) {
    return (
        <div className='job'>
            <h1 className="job-title" href="">{data.text}</h1>
            <div className="job-tags">
                <span>{data.categories.team}</span>
                <span>{data.categories.location}</span>
                <span>{data.categories.commitment}</span>
            </div>
            <p className="job-description">{data.descriptionPlain.substring(0,250)}</p>
            <a href={data.applyUrl}></a>
        </div>

    )
}


class JobsMain extends React.Component {
    constructor() {
        super()
    }

    render() {
        const jobs = this.props.jobs
        return (
            <section className="jobs-page">
                <section className="job-body">
                    <div><h1>Job openings</h1></div>
                    <div>
                        {
                            jobs.map((job) => {
                                return <Job key={job.id} data={job}/>
                            })
                        }
                    </div>
                </section>
            </section>
        )
    }
}


JobsMain.defaultProps = {
    jobs: jobsData
}

export default JobsMain



