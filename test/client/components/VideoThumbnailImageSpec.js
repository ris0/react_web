import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import VideoThumbnailImage from '../../../client/components/VideoThumbnailImage'

const video = {
    titles: {
        main: 'Something about cats'
    },
    resources: {
        mobile: {
            feature: 'a-mobile-feature-image'
        },
        cover: 'a-large-cover-image',
        feature: 'a-large-feature-image'
    }
}

describe('VideoThumbnailImage', function() {
    it('should render an img tab with the alt prop set to the video title', function() {
        const videoThumbnailImage = shallow(<VideoThumbnailImage video={video} />)
        const img = videoThumbnailImage.find('img')
        expect(img.props().alt).to.eql('Something about cats')
    });

    describe('large screens', function() {
        beforeEach(function() {
            this.windowWidth = 800
        })

        it('should render the feature image for features', function() {
            const videoThumbnailImage = shallow(<VideoThumbnailImage windowWidth={this.windowWidth} video={video} isFeature={true} />)
            const img = videoThumbnailImage.find('img')
            expect(img.props().src).to.eql('a-large-feature-image')
        })

        it('should render the cover image for non-features', function() {
            const videoThumbnailImage = shallow(<VideoThumbnailImage windowWidth={this.windowWidth} video={video} isFeature={false} />)
            const img = videoThumbnailImage.find('img')
            expect(img.props().src).to.eql('a-large-cover-image')
        })
    });

    describe('mobile', function() {
        beforeEach(function() {
            this.windowWidth = 400
        })

        it('should render the feature image for features', function() {
            const videoThumbnailImage = shallow(<VideoThumbnailImage windowWidth={this.windowWidth} video={video} isFeature={true} />)
            const img = videoThumbnailImage.find('img')
            expect(img.props().src).to.eql('a-mobile-feature-image')
        })
    })
})

