import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import td from 'testdouble'
import SocialButtons from '../../../client/components/SocialButtons'
import SocialSidebar from '../../../client/routes/Videos/components/SocialSidebar.js'

describe('SocialButtons', function() {
    beforeEach(function () {
        this.icons = [
            { name: 'facebook' },
            { name: 'twitter' },
            { name: 'pinterest' },
            { name: 'email' }
        ]
        this.share = td.function();
        this.socialButtons = shallow( <SocialButtons icons={this.icons} onClick={this.share()}/>)
        this.mountedButtons = mount(<SocialButtons icons={this.icons} onClick={this.share()}/>)
        this.clickButtons = this.mountedButtons.find('a');
    });

    it('should define the component', function() {
        expect(SocialButtons).to.be.a('function')
    });

    it('should have 4 children', function() {
        expect(this.socialButtons.children().length).to.equal(4)
    });

    it('it should invoke share() when clicked', function() {
        this.clickButtons.first().simulate('click');
        td.verify(this.share());
    });
});
