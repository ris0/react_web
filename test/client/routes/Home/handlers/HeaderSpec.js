import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { HomeHeader } from '../../../../../client/routes/Home/handlers/Header'

describe('HomeHeader', function() {
    it('should define the component', function() {
        expect(HomeHeader).to.be.a('function')
    });

    it('should not render a Carousel if videos are not passed', function() {
        const homeHeader = shallow(<HomeHeader />)
        const carousel = homeHeader.find('Carousel')
        expect(carousel).to.be.length(0)
    });

    it('should render one Carousel if videos are passed', function() {
        const homeHeader = shallow(<HomeHeader videos={[{ unique_id: 123 }, { unique_id: 456 }]}/>)
        const carousel = homeHeader.find('Carousel')
        expect(carousel).to.be.length(1)
    });
});

