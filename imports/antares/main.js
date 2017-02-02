import { AntaresMeteorInit, AntaresInit, inAgencyRun } from 'meteor/deanius:antares'
import * as Actions from './actions'
import * as Fixtures from '../fixtures'
import gameReducer from './reducers/game'

// Build up a config object, via imports
const AntaresConfig = {
    Actions,
    ReducerForKey: () => gameReducer
}

// Pass the config to the meteorized version of AntaresInit
export const Antares = AntaresMeteorInit(AntaresInit)(AntaresConfig)

//seed it up
inAgencyRun('server', () => {
    Antares.announce(Actions.Game.start((new Fixtures.Game).toJS()))
})

inAgencyRun('client', () => {
    Antares.subscribe({
        key: 'game:demo'
    })
})

// In 'any' agent expose a top-level Antares global for demo purposes
inAgencyRun('any', function () {
    Object.assign(this, {
        Antares
    })
    // TODO define startup code here
})
