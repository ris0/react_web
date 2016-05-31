import React from 'react'
import { expect } from 'chai'
import td from 'testdouble'
import { Link } from 'react-router'
import { shallow } from 'enzyme'
import NavDropdown from '../../../client/components/NavDropdown'

describe('NavDropdown', function() {
    it('should define the component', function() {
        expect(NavDropdown).to.be.a('function')
    })

    describe('Dropdown Trigger', function() {
        it('should render passed children', function() {
            const navDropdown = shallow(
                <NavDropdown>
                    <h1>CLICKME</h1>
                </NavDropdown>)

            const h1 = navDropdown.find('h1').first()
            expect(h1.text()).to.eql('CLICKME')
        })

        it('should call the provided onToggle handler when clicked', function() {
            const onToggle = td.function()
            const navDropdown = shallow(
                <NavDropdown onToggle={onToggle}>
                    <h1>CLICKME</h1>
                </NavDropdown>)
            const a = navDropdown.find('a').first()
            a.simulate('click')

            td.verify(onToggle())
        })
    })

    it('should render all links if the dropdown is open', function() {
        const navDropdown = shallow(
            <NavDropdown
                items={{
                    1: { id: 1, name: 'Uno' },
                    2: { id: 2, name: 'Dos' },
                    3: { id: 3, name: 'Tres' }
                }}
                showDropdown={true}
            />)

        const links = navDropdown.find(Link)
        expect(links.length).to.eql(3)
        expect(links.at(0).props().to).to.eql('/categories/Uno/1')
        expect(links.at(1).props().to).to.eql('/categories/Dos/2')
        expect(links.at(2).props().to).to.eql('/categories/Tres/3')
    })

    it('should not render links if the dropdown is not open', function() {
        const navDropdown = shallow(
            <NavDropdown
                items={{
                    1: { id: 1, name: 'Uno' },
                    2: { id: 2, name: 'Dos' },
                    3: { id: 3, name: 'Tres' }
                }}
                showDropdown={false}
            />)

        const links = navDropdown.find(Link)
        expect(links.length).to.eql(0)
    })
})

