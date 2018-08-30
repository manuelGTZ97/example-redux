import { createStore } from 'redux';
import { loadStorage } from './localStorage';



const reducer  = (state= loadStorage(), action) => {

    switch(action.type){
        case "ADD_TO_CART":
            return{ cart: state.cart.concat(action.product) }
            break;
        case "REMOVE_FROM_CART":
            return{ cart: state.cart.filter(product => product.id !== action.product.id) }
            break;
        default:
            return state;
    }
};

export default createStore(reducer);
