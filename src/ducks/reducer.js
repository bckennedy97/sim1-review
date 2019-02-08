//initial state
const INTITIAL_STATE = {
    inventory: [],
}

const SET_INVENTORY = "SET_INVENTORY";
const ADD_PRODUCT = "ADD_PRODUCT";

//reducer function ---default argument of initial state if state argument is not given---
export default function reducer(state = INTITIAL_STATE,action){
    switch(action.type){
        case SET_INVENTORY:
        // return Object.assign({},state,{inventory: action.payload})
            return {...state, inventory: action.payload} //spread operator

        case ADD_PRODUCT:
            const inventoryCopy = state.inventory.slice() 
            inventoryCopy.push(action.payload); //copy of inventory plus new product
            return {...state, inventory: inventoryCopy} //inventory is set to the new inventory

        default: 
            return state;
    }
}


//actions

export function setInventory(inventory){
    return {
        type: SET_INVENTORY,
        payload: inventory
    }
}
export function addProduct(product){
    return{
        type: ADD_PRODUCT,
        payload: product
    }
}
