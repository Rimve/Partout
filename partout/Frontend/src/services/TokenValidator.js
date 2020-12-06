import * as jwt from "jsonwebtoken";

// export the action type used as a const, so it can be imported for
// the reducer to listen for...  The export const/key is more convenient
// then you can use a more namespaced string value to help prevent collisions
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';

// redux middleware pattern (store) => (next) => (action) => result;
export default function TokenValidator(store) {
    // here we only care about a handle to the store for store.dispatch
    // start checking every 15 seconds, probably want this configurable
    setInterval(checkToken.bind(null, store), 15000);

    // return a pass-through for the plugin, so other plugins work
    return (next) => (action) => next(action);
}

// export checkToken for testing... etc
// should probably be a separate module
export function checkToken(store) {
    var token = localStorage.getItem("token"); // TODO: Identify token
    var isExpired = checkExpiration(token); // TODO: replace with function to get current state
    if (isExpired) {
        store.dispatch({
            type: TOKEN_EXPIRED,
            payload: { tokenId: token },
        });
    }
}

function checkExpiration(token) {
    if (token != null) {
        const decodedToken = jwt.decode(token, {complete: true});
        const dateNow = new Date();

        if (decodedToken.exp < dateNow.getTime())
            return true;
    }
}

export function getUserRoles(token) {
    const decodedToken = jwt.decode(token, {complete: true});
    if (decodedToken !== null) {
        return decodedToken.payload.roles;
    }
}

export function getUserName(token) {
    const decodedToken = jwt.decode(token, {complete: true});
    if (decodedToken !== null) {
        return decodedToken.payload.sub;
    }
}

export function getUserId(token) {
    const decodedToken = jwt.decode(token, {complete: true});
    if (decodedToken !== null) {
        return decodedToken.payload.id_user;
    }
}