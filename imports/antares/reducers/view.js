import { createReducer, combineReducers, iMap, fromJS } from 'meteor/deanius:antares'

export const ViewReducer = createReducer({
    'View.changeSides': state =>
        state.get('currentPlayer') === 'White' ?
            state.set('currentPlayer', 'Black') :
            state.set('currentPlayer', 'White'),

    'View.restore': (old, newState) => fromJS(newState)
}, new iMap())
