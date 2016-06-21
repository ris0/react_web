import React from 'react'

class JobsHeader extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <section className="jobs-container page-header">
                <div style={{ position: 'relative', width: '100%', height: '65vh', backgroundColor: 'gray' }}>
                    <h1 style={{ position: 'absolute', top: '50%', left: '60px', color: 'white' }}>Rich will code for food and dog toys</h1>
                </div>
            </section>
        )
    }
}

export default JobsHeader
