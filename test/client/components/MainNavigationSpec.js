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
        const links = mainNavigation.find('a')
        expect(links.at(0).text()).to.eql('uno')
        expect(links.at(1).text()).to.eql('dos')
        expect(links.at(2).text()).to.eql('tres')
    });

    it('should render SocialButtons', function() {
        const mainNavigation = shallow(<MainNavigation />)
        expect(mainNavigation.find(SocialButtons).length).to.eql(1)
    });
});

