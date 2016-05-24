import React from 'react'

class AboutHeader extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <section className="about-page page-header">
                <div style={{ position: 'relative', width: '100%', height: '65vh', backgroundColor: 'gray' }}>
                    <h1 style={{ position: 'absolute', top: '50%', left: '60px', color: 'white' }}>How Knowsy Does It</h1>
                </div>
            </section>
        )
    }
}

export default AboutHeader
