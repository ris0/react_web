import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Carousel from '../../../client/components/Carousel'

describe('Carousel', function() {
    it('should define the component', function() {
        expect(Carousel).to.be.a('function')
    });

    it('should not render a title if one is not provided', function() {
        const carousel = shallow(<Carousel />)
        expect(carousel.find('h1')).to.have.length(0)
    });
});

