import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import td from 'testdouble'
import NewsletterSignup from '../../../client/components/NewsletterSignup'

describe('NewsletterSignup', function() {

    beforeEach(function () {
        this.onSubscribe = td.function();
        this.newsletterSignup = mount( < NewsletterSignup onSubscribe= { this.onSubscribe } />);
        this.button = this.newsletterSignup.find('button');
        this.input = this.newsletterSignup.find('input');
    });

    it('should define the component', function() {
        expect(NewsletterSignup).to.be.a('function')
    });

    it('should run onSubscribe when user submits valid email', function() {

        this.input.get(0).value = 'stephen@curry.com';
        this.button.simulate('click');
        td.verify(this.onSubscribe('stephen@curry.com'));
    });

    it('should NOT run onSubscribe when user submits invalid email', function() {

        this.input.get(0).value = '123.curry.com';
        this.button.simulate('click');
        td.verify(this.onSubscribe(), { times: 0, ignoreExtraArgs: true });

    });


});

