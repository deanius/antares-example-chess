import { localConsequence, createPromiseEpic } from 'meteor/deanius:antares'

/*
Example usage:
drawOffer = announce(Actions.Draw.offer, { player: 'Self' })
drawOffer.endOfEpic()
  .then( () => console.log('The Draw Epic Has Concluded (Game drawn, or offer declined).') )
    
*/
export default {
    replyToDrawConcludesOffer: action$ =>
        action$.ofType('Draw.reply')
            // By emitting an .end event, we allow callers to hook onto
            // the arrival of this event to know this Draw.offer epic is over
            .map(a => localConsequence(a, {
                type: 'Draw.offer.end'
            })),

    acceptingDrawEndsGame: action$ =>
        action$.ofType('Draw.reply')
            // In cases of accepting the draw
            .filter(a => a.payload.accept)
            // Create a consequence that ends the game, assigning the score.
            .map(a => localConsequence(a, {
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
            .map(a => localConsequence(a, {
                type: 'Draw.reply',
                payload: {
                    player: a.payload.player,
                    accept: false
                }
            })),
    /*
    When actions cannot be completed immediately, because their fulfillment
    is async (such as when using remote resources), we break their fulfillment
    into multiple actions, and call the whole bunch of them an Epic.

    Here's an example of using an epic Quota.query, which we can see as a
    Quota.query.begin action when the remote request has begun, and a
    Quota.query.end (or .error) action when it's completed or errored
    
    We use the startOfEpic() and endOfEpic() promises to add handlers
    to these points in time.

```    
let announcedAction = announce('Quota.query', { remaining: 'Unknown MB' })
announcedAction.startOfEpic()
  .then(x => console.log('Started: ', x))

announcedAction.endOfEpic()
  .then(x => console.log('Success!', x))
  .catch(e => console.warn('Error:', e))
```
    */
    exampleEpic: createPromiseEpic('Quota.query', () => {
        return new Promise(resolve => {
            setTimeout(() => { resolve({ remaining: '25 Mb' }) }, 2000)
        })
    })
}
