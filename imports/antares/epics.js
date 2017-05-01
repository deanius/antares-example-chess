import { inAgencyRun, createConsequence, createPromiseEpic, Observable } from 'meteor/deanius:antares'
import Actions from './actions'
import GameFixture from '/imports/fixtures/game'

/*
Example usage:
drawOffer = announce(Actions.Draw.offer({ player: 'White' }))
drawOffer.endOfEpic()
  .then( () => console.log('The Draw Epic Has Concluded (Game drawn, or offer declined).') )

*/

const epics = {}

inAgencyRun('server', () => {
    // Given a stream of actions to query, and a drawOffer,
    // returns an Observable for
    const concludeDrawUponReply = action$ => drawOffer => {
        return action$
            .ofType('Draw.reply')
            // By emitting an .end event, we allow callers to hook onto
            // the arrival of this event to know this Draw.offer epic is over
            .map(a => createConsequence(a, {
                type: 'Draw.offer.end',
                payload: a.payload,
                meta: {
                    antares: {
                        concludesEpic: drawOffer.meta.antares.actionId
                    }
                }
            }))
    }
    Object.assign(epics, {
        replyToDrawConcludesOffer: action$ =>
            action$.ofType('Draw.offer')
                .flatMap(concludeDrawUponReply(action$)),

        acceptingDrawEndsGame: action$ =>
            action$.ofType('Draw.reply')
                // In cases of accepting the draw
                .filter(a => a.payload.accept)
                // Create a consequence that ends the game, assigning the score.
                .map(a => createConsequence(a, {
                    type: 'Game.end',
                    payload: {
                        score: [0.5, 0.5]
                    }
                })),

        makingMoveDeclinesDraw: (action$, store) =>
            action$.ofType('Move.make')
                // Dont consider moves made unless there's a draw outstanding
                .filter(a =>
                    store.getState().antares.getIn(['game:demo', 'draw']))
                // then turn them into declines of the draw
                .map(a => createConsequence(a, {
                    type: 'Draw.reply',
                    payload: {
                        player: a.payload.player,
                        accept: false
                    }
                })),

        restart: action$ =>
            action$.ofType('Game.end')
                .flatMap(() => {
                    return Observable.of(Actions.Game.start((new GameFixture).toJS()))
                    .delay(7000)
                })
    })
})

export default epics
