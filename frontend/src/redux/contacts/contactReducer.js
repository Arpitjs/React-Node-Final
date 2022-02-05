import { LIST_OF_CONTACTS } from "./contactTypes";

const initalState = {
    name: '',
    email: '',
    phone: '',
    image: '',
    address: ''
}

export function contactReducer(state = initalState, action) {
    switch(action.type) {
        case LIST_OF_CONTACTS:
            return action.payload
        default: return state;
    }
}
