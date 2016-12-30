function containsPayload(action) {
    return action != null && action.payload != null;
}

export function resetStateBeforeLocationChange(match, state, initialState, action) {
    if (action.type == '@@router/LOCATION_CHANGE') {
        if (containsPayload(action)) {
            const payload = action.payload;
            if (payload.pathname.startsWith(match) && payload.hash != '#menu' && payload.action != 'REPLACE') {
                return initialState;
            }
        }
    }
    return state;
}