import { combineReducers } from 'redux'
import products from './products'
import itemEditting from './itemEditting'

const myReducers = combineReducers({
    products,
    itemEditting
})
export default myReducers;