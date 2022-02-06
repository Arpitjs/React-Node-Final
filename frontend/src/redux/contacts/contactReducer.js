import { FAV_CONTACT, LIST_OF_CONTACTS } from "./contactTypes";

export function contactReducer(state = null, action) {
    switch(action.type) {
        case LIST_OF_CONTACTS:
            return action.payload
        default: return state;
    }
}

export function favoriteReducer(state = null, action) {
    switch(action.type) {
        case FAV_CONTACT:
            return action.payload;
        default: return state;
    }
}

