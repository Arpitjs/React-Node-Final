import {LIST_OF_CONTACTS} from './contactTypes';

const contactActions = (payload) => {
    return {
        type: LIST_OF_CONTACTS,
        payload
    }
}

export default contactActions;