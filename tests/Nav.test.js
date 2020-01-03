import React from 'react'
import { shallow } from 'enzyme'
import Nav from '../client/components/Nav'
import { IfAuthenticated, IfNotAuthenticated } from '../client/components/Authenticated'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'

let wrapper
describe('testing links in Nav component', () => {
    beforeAll(() => {
        wrapper = shallow(<Nav />)
    })
    it('logOff visible if authenticated', () => {
        let found = false
        wrapper.find(IfAuthenticated).find(Link).forEach((link) => {
            if (link.props().onClick == logOff) {
                found = true
            }
        })
        expect(found).toBe(true)
    })
    it('logOff not visible if not authenticated', () => {
        let found = false
        wrapper.find(IfNotAuthenticated).find(Link).forEach((link) => {
            if (link.props().onClick == logOff) {
                found = true
            }
        })
        expect(found).toBe(false)
    })
})
