import {ADD_TO_CART ,REMOVE_TO_CART} from '../constants'

export const addToCart = (data)=>{
    // console.warn(data ,"Action")  
    return{
        type:ADD_TO_CART,
        data:data
    }
}

export const removeToCart = (data)=>{
     console.warn( "Action")  
    return{
        type:REMOVE_TO_CART,
    }
}