import axios from "axios";

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}


const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA"
const ADD_PURCHASES = "ADD_PURCHASES"
const REMOVE_PURCHASES = "REMOVE_PURCHASES"

export function requestBudgetData(){
    let data = axios.get('/api/budget-data').then(res => res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}
export function addPurchase  (price, description, category) {
    let data = axios.post('/api/budget-data/purchase', {
        description,
        price,
        category
    }).then(res=> res.data)
    return {
        type: ADD_PURCHASES,
        payload: data

    }
}

export function removePurchase(id){
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    return {
        type: REMOVE_PURCHASES,
        payload: data
    }
}


export default function reducer(state = initialState, action){
    switch(action.type){
        case `${REQUEST_BUDGET_DATA}_PENDING`:
            return {
                ...state,
                loading: true
            }
            case `${REQUEST_BUDGET_DATA}_FULFILLED`:
                return {
                    ...state,
                    ...action.payload,
                    loading: false
                }
                case `${ADD_PURCHASES}_PENDING`:
                    return {
                        ...state,
                        loading: true
                    }
                    case `${ADD_PURCHASES}_FULFILLED`:
                        return {
                            ...state,
                            ...action.payload,
                            loading: false
                        }
                        case `${REMOVE_PURCHASES}_PENDING`:
                        return {
                            ...state,
                            loading: true
                        }
                        case `${REMOVE_PURCHASES}_FULFILLED`:
                            return {
                                ...state,
                                loading: false
                            }



    }
    return state;
}