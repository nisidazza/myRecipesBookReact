import React from 'react'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import App from '../client/components/App'
import SignIn from '../client/components/SignIn'
import Register from '../client/components/Register'
import IngredientsList from '../client/components/IngredientsList'
import RecipesList from '../client/components/RecipesList'
import Nav from '../client/components/Nav'
import {Route} from 'react-router-dom'


describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true)
    }),
    it('My Test Case2', () => {
        expect(true).toEqual(true) 
    }),
    it('renders correctly', () => {
        const component = renderer.create(<App />)
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})

let pathMap = {}
describe('routes using array of routers', () => {
    beforeAll(() => {
        const wrapper = shallow(<App />);        
        console.log("wrapper: ")
        console.log(wrapper)
        pathMap = wrapper.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props() 
            pathMap[routeProps.path] = routeProps.component
            return pathMap
        }, {})
        console.log("pathMap: ")
        console.log(pathMap)
    })
    it('should show Nav component for / router', () => {
        expect(pathMap['/']).toBe(Nav)
    }),
    it('should show Register component for /register', () => {
        expect(pathMap['/register']).toBe(Register)
    }),
    it('should show SignIn component for /register', () => {
        expect(pathMap['/signin']).toBe(SignIn)
    }),
    it('should show IngredientsList component for /ingredients', () => {
        expect(pathMap['/ingredients']).toBe(IngredientsList)
    }),
    it('should show RecipesList component for /recipes', () => {
        expect(pathMap['/recipes']).toBe(RecipesList)
    })
})

