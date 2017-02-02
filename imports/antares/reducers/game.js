import { createReducer } from 'redux-act'
import { fromJS } from 'immutable'

export default createReducer({
    'Game.end': (state, { score }) =>
        state.merge({
            score,
            active: false
        }),
    'Draw.offer': (state, { player }) => {
        if (state.get('draw')) throw new Error('A draw is already pending')

        return state.set('draw', fromJS({
            status: 'pending',
            offeredBy: player,
            accepted: null
        }))
    }
}, fromJS({}))
