import React from 'react';
import VideoGrid from '../../../components/VideoGrid'
import { connect } from 'react-redux'

class CategoriesMain extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { category, categoryContent } = this.props
        return (
            <section className="category-page">
                <h3>{category.name}</h3>
            {
                categoryContent.length ?
                    <div>
                        <VideoGrid videos={categoryContent} hasMore={false} />
                        <VideoGrid videos={categoryContent} hasMore={false} />
                    </div>
                    : null
            }
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        category: state.app.categories.find((category) => category.link === ownProps.params.categoryName),
        categoryContent: []
    }
}

export default connect(mapStateToProps, {})(CategoriesMain)
