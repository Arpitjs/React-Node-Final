import { LOGGED_IN_USER } from "./authTypes";

export const authActions = (payload) => {
    return {
        type: LOGGED_IN_USER,
        payload
    }
}