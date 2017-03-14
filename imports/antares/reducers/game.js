import { createReducer } from 'redux-act'
import { fromJS } from 'immutable'

export default createReducer({
    'Game.end': (state, { score }) =>
        state.merge({
            score,
            active: false
        }),
    'Draw.offer': (state, { player }) => {
        if (state.get('draw') && state.getIn(['draw', 'status']) !== 'accepted')
            throw new Error('A draw is already pending')

        return state.set('draw', fromJS({
            status: 'pending',
            offeredBy: player
        }))
    },
    'Draw.reply': (state, { player, accept }) => {
        if (state.getIn(['draw', 'offeredBy']) == player)
            throw new Error('Cannot reply to ones own draw')

        return accept ?
            state.setIn(['draw', 'status'], 'accepted') :
            state.delete('draw')
    }
}, fromJS({}))
