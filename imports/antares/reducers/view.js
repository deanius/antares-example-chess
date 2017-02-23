import { createReducer } from 'redux-act'
import { combineReducers } from 'redux-immutable'

export const ViewReducer = combineReducers({
    viewingAs: createReducer({
        'View.changeSides': viewingAs => (viewingAs === 'Self' ? 'Other' : 'Self')
    }, 'Self')
})
