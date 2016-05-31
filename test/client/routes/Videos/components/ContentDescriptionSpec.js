import React from 'react'
import { expect } from 'chai'
import td from 'testdouble'
import { mount, shallow } from 'enzyme'
import { ContentDescription } from '../../../../../client/routes/Videos/components/ContentDescription'

describe('ContentDescription', function() {

    afterEach(function() {
        td.reset()
    })

    it('should define the component', function() {
        expect(ContentDescription).to.be.a('function')
    })

    describe('basic text content', function() {
        it('should allow toggling body text', function() {
            const caption = `this is some long long long long long long long text content blah blah blah more stuff and things that shouldnt all show blah blah blah more stuff and things that shouldnt all show blah blah blah more stuff and things that shouldnt all show blah blah blah more stuff and things that shouldnt all show blah blah blah more stuff and things that shouldnt all show by default blah nah nah nah`

            const contentDescription = shallow(
                <ContentDescription
                    video={{
                        title: 'Text Content',
                        caption

                    }} />)

            const bodyTextElement = contentDescription.find('p').first()
            expect(bodyTextElement.text()).to.have.length.below(caption.length)
            contentDescription.setProps({
                showAllText: true
            })

            const updatedBodyTextElement = contentDescription.find('p').first()
            expect(updatedBodyTextElement.text()).to.eql(caption)
        })
    })

    describe('printing', function() {
        beforeEach (function() {
            this.onClickShowAll = td.function()
            this.printMock = td.replace(window, 'print')
            td.replace(window, 'setTimeout', (fn) => fn())
        })

        it('should render the print link', function() {
            const contentDescription = mount(<ContentDescription />)
            const printLink = contentDescription.find('.icon.icon-print')
            expect(printLink).to.have.length(1)
        })

        describe('full body text is hidden', function() {
            beforeEach (function() {
                this.contentDescription = mount(<ContentDescription onClickShowAll={this.onClickShowAll} showAllText={false} />)
                this.printLink = this.contentDescription.find('.icon.icon-print')
            })

            it('should fire the onClickShowAll function with `true` when the print link is clicked', function() {
                this.printLink.simulate('click')
                td.verify(this.onClickShowAll(true))
            })

            it('should open the print dialog', function() {
                this.printLink.simulate('click')
                td.verify(this.printMock())
            })
        })

        describe('full body text is shown', function() {
            beforeEach (function() {
                this.contentDescription = mount(<ContentDescription onClickShowAll={this.onClickShowAll} showAllText={true} />)
                this.printLink = this.contentDescription.find('.icon.icon-print')
            })

            it('should NOT fire the onClickShowAll function when the print link is clicked', function() {
                this.printLink.simulate('click')
                td.verify(this.onClickShowAll(), { times: 0, ignoreExtraArgs: true })
            })
        })
    })
})

