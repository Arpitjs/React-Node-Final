import { LOGGED_IN_USER } from "./authTypes";

export const authReducer = (state = null, action) => {
   switch(action.type) {
       case LOGGED_IN_USER: 
       return action.payload;
       default: return state;
   }
}