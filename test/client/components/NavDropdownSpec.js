import React from 'react'
import { expect } from 'chai'
import td from 'testdouble'
import { Link } from 'react-router'
import {
    renderIntoDocument,
    scryRenderedComponentsWithType,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils'
import NavDropdown from '../../../client/components/NavDropdown'

describe('NavDropdown', function() {
    it('should define the component', function() {
        expect(NavDropdown).to.be.a('function')
    });

    describe('Dropdown Trigger', function() {
        it('should render passed children', function() {
            const navDropdown = renderIntoDocument(
                <NavDropdown>
                    <h1>CLICKME</h1>
                </NavDropdown>)

            const [h1] = scryRenderedDOMComponentsWithTag(navDropdown, 'h1')
            expect(h1.innerHTML).to.eql('CLICKME')
        });

        it('should call the provided onToggle handler when clicked', function() {
            const onToggle = td.function()
            const navDropdown = renderIntoDocument(
                <NavDropdown onToggle={onToggle}>
                    <h1>CLICKME</h1>
                </NavDropdown>)
            const [h1] = scryRenderedDOMComponentsWithTag(navDropdown, 'h1')
            Simulate.click(h1)

            td.verify(onToggle(td.matchers.isA(Object), td.matchers.anything()))
        });
    });

    it('should render all links if the dropdown is open', function() {
        const navDropdown = renderIntoDocument(
            <NavDropdown
                items={{
                    1: { id: 1, name: 'Uno' },
                    2: { id: 2, name: 'Dos' },
                    3: { id: 3, name: 'Tres' }
                }}
                showDropdown={true}
            />)

        const links = scryRenderedComponentsWithType(navDropdown, Link)
        expect(links.length).to.eql(3)
        expect(links[0].props.to).to.eql('/categories/Uno/1')
        expect(links[1].props.to).to.eql('/categories/Dos/2')
        expect(links[2].props.to).to.eql('/categories/Tres/3')
    });

    it('should not render links if the dropdown is not open', function() {
        const navDropdown = renderIntoDocument(
            <NavDropdown
                items={{
                    1: { id: 1, name: 'Uno' },
                    2: { id: 2, name: 'Dos' },
                    3: { id: 3, name: 'Tres' }
                }}
                showDropdown={false}
            />)

        const links = scryRenderedComponentsWithType(navDropdown, Link)
        expect(links.length).to.eql(0)
    });
});

