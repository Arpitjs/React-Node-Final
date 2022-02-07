import { LIST_OF_CONTACTS } from "./contactTypes";

export function contactReducer(state = null, action) {
    switch(action.type) {
        case LIST_OF_CONTACTS:
            return action.payload;
        default: return state;
    }
}


