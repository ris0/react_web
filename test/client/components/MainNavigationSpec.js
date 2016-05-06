import React from 'react'
import { expect } from 'chai'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils'
import MainNavigation from '../../../client/components/MainNavigation'
import SocialButtons from '../../../client/components/SocialButtons'

describe('MainNavigation', function() {
    it('should define the component', function() {
        expect(MainNavigation).to.be.a('function')
    });

    it('should render all links', function() {
        const mainNavigation = renderIntoDocument(<MainNavigation navLinks={['uno', 'dos', 'tres']} />)
        const links = scryRenderedDOMComponentsWithTag(mainNavigation, 'a')
        expect(links[0].innerHTML).to.eql('uno')
        expect(links[1].innerHTML).to.eql('dos')
        expect(links[2].innerHTML).to.eql('tres')
    });

    it('should render SocialButtons', function() {
        const mainNavigation = renderIntoDocument(<MainNavigation />)
        const links = scryRenderedDOMComponentsWithTag(mainNavigation, 'a')
        expect(links.length).to.be.above(0)
    });
});

