import { createConsequence } from 'meteor/deanius:antares'

/*
Example usage:
drawEpicEndPromise = announce(Actions.Draw.offer, { player: 'Self' })
    .then( result => { console.log('Draw offer delivered'); return result } )
    .then( ({epic}) => epic.promiseEnd() )
    .then( () => console.log('The Draw Epic Is Finito.') )
*/
export default {
    replyToDrawConcludesOffer: action$ =>
        action$.ofType('Draw.reply')
            .map(a => ({
                type: 'Draw.offer.end'
            })),
    acceptingDrawEndsGame: action$ =>
        action$.ofType('Draw.reply')
            .filter(a => a.payload.accept)
            .map(a => createConsequence(a, {
                type: 'Game.end',
                payload: {
                    score: [0.5, 0.5]
                }
            })),
    makingMoveDeclinesDraw: action$ =>
        action$.ofType('Move.make')
            .map(a => createConsequence(a, {
                type: 'Draw.reply',
                payload: {
                    player: a.payload.player,
                    accept: false
                }
            }))
}
