import { createReducer } from 'redux-act'
import { fromJS } from 'immutable'

export default createReducer({
    'Game.end': (state, { score }) =>
        state.merge({
            score,
            active: false
        })
}, fromJS({}))
