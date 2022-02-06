import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { contactReducer, favoriteReducer } from './contacts/contactReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    contacts: contactReducer,
    favorite: favoriteReducer
});

export default rootReducer;