import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'

import VideoThumbnail from '../../../client/components/VideoThumbnail'

describe('VideoThumbnail', function() {
    beforeEach(function() {
        this.video = {
            titles: {
                main: 'Hey Hey Overlay-ay-ay'
            },
            resources: {}
        }
    })

    it('should define the component', function() {
        expect(VideoThumbnail).to.be.a('function')
    })

    it('should render nothing if a video is not provided', function() {
        const videoThumbnail = shallow(<VideoThumbnail />)
        expect(videoThumbnail.children()).to.have.length(0)
    })

    describe('TextOverlay', function() {
        it('should be rendered if showOverlay is provided', function() {
            const videoThumbnail = mount(<VideoThumbnail showOverlay={true} video={this.video} />)
            const textOverlay = videoThumbnail.find('.overlay')
            expect(textOverlay.find('h1').text()).to.eql('Hey Hey Overlay-ay-ay')
        })

        it('should not be rendered if showOverlay is not provided', function() {
            const videoThumbnail = mount(<VideoThumbnail video={this.video} />)
            expect(videoThumbnail.find('.overlay')).to.have.length(0)
        })

        it('should not be rendered if showOverlay is false', function() {
            const videoThumbnail = mount(<VideoThumbnail showOverlay={false} video={this.video} />)
            expect(videoThumbnail.find('.overlay')).to.have.length(0)
        })
    })

    describe('Content Description', function() {
        it('should display a title if the showTitle option is provided', function() {
            const videoThumbnail = mount(<VideoThumbnail showTitle={true} video={this.video} />)
            expect(videoThumbnail.find('.content-description h1').text()).to.eql('Hey Hey Overlay-ay-ay')
        });

        it('should not display a title if the showTitle option is false', function() {
            const videoThumbnail = mount(<VideoThumbnail showTitle={false} video={this.video} />)
            expect(videoThumbnail.find('.content-description h1')).to.have.length(0)
        });
    });
})

