import * as Types from './../constants/ActionTypes'
import callApi from '../utils/apiCaller';

/** lấy tất cả */
export const actFetchProductsRequest = products =>{
    return(dispatch)=>{
        return callApi('products','GET',null).then(res=>{
            dispatch(actFetchProducts(res.data))
        })
    }
}

export const actFetchProducts = products =>{
    return{
        type: Types.FETCH_PRODUCTS,
        products
    }
}
/** Xóa */
export const actDeleteProducts = id =>{
    return{
        type: Types.DELETE_PRODUCT,
        id
    }
}

export const actDeleteProductRequest = id => {
    return dispatch => {
        return callApi(`products/${id}`,'DELETE',null).then(res=>{
            dispatch(actDeleteProducts(id))
        })
    }
}
/** Thêm */
export const actAddProduct = product => {
    return{
        type: Types.ADD_PRODUCT,
        product
    }
}

export const actAddProductRequest = product => {
    return dispatch=>{
        return callApi('products','POST',product).then(res=>{
            dispatch(actAddProduct(res.data))
        })
    }
}
/** lấy 1 */
export const actGetProduct = product => {
    return {
        type: Types.EDIT_PRODUCT,
        product
    }
}

export const actGetProductRequest = id => {
    return dispatch=>{
        return callApi(`products/${id}`,'GET',null).then(res=>{
            dispatch(actGetProduct(res.data))
        })
    }
}

/** sửa - lưu lại */
export const actUpdateProduct = product => {
    return {
        type: Types.UPDATE_PRODUCT,
        product
    }
}

export const actUpdateProductRequest = product => {
    return dispatch=>{
        return callApi(`products/${product.id}`,'PUT',product).then(res=>{
            dispatch(actUpdateProduct(res.data))
        })
    }
}
