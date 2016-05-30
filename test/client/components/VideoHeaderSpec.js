import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import VideoHeader from '../../../client/components/VideoHeader'

describe('VideoHeader', function() {
    it('should define the component', function() {
        expect(VideoHeader).to.be.a('function')
    });

    it('should render a title if provided', function() {
        const videoHeader = shallow(<VideoHeader title={"VIDEO HEADER TITLE YO"}/>)
        const title = videoHeader.find('h1')
        expect(title.text()).to.eql('VIDEO HEADER TITLE YO')
    });

    it('should not render a title if not provided', function() {
        const videoHeader = shallow(<VideoHeader />)
        const title = videoHeader.find('h1')
        expect(title.length).to.equal(0)
    });

    it('should define the wrapper elements class to be the passed in className prop', function() {
        const videoHeader = shallow(<VideoHeader className="zip-zap-wrap"/>)
        expect(videoHeader.find('.video-header.zip-zap-wrap')).to.have.length(1)
    });

    it('should not load the player if a video is not available', function() {
        const videoHeader = shallow(<VideoHeader />)
        expect(videoHeader.find('FlowPlayer')).to.have.length(0)
    });

    it('should load the player if a video is available', function() {
        const videoHeader = shallow(<VideoHeader video={{ unique_key: 123 }}/>)
        expect(videoHeader.find('FlowPlayer')).to.have.length(1)
    });

    it('should render all provided children', function() {
        const videoHeader = shallow(<VideoHeader><ul><li>Ooh</li><li>Child</li></ul></VideoHeader>)
        const lis = videoHeader.find('li')
        expect(lis.length).to.equal(2)
        expect(lis.at(0).text()).to.equal('Ooh')
        expect(lis.at(1).text()).to.equal('Child')
    });
});

