import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { contactReducer } from './contacts/contactReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    contacts: contactReducer
});

export default rootReducer;