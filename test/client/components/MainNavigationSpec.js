import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import MainNavigation from '../../../client/components/MainNavigation'
import SocialButtons from '../../../client/components/SocialButtons'

describe('MainNavigation', function() {
    it('should define the component', function() {
        expect(MainNavigation).to.be.a('function')
    });

    it('should render all links', function() {
        const mainNavigation = shallow(<MainNavigation navLinks={['uno', 'dos', 'tres']} />)
        const links = mainNavigation.find('Link')
        expect(links.at(0).props().to).to.eql('/uno')
        expect(links.at(1).props().to).to.eql('/dos')
        expect(links.at(2).props().to).to.eql('/tres')
    });

    it('should render SocialButtons', function() {
        const mainNavigation = shallow(<MainNavigation />)
        expect(mainNavigation.find(SocialButtons)).to.have.length(1)
    });
});

