import { createReducer } from 'redux-act'
import { combineReducers } from 'redux-immutable'

export const ViewReducer = combineReducers({
    currentPlayer: createReducer({
        'View.changeSides': currentPlayer => (currentPlayer === 'Self' ? 'Other' : 'Self')
    }, 'Self')
})
