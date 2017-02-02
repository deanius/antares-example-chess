import { Meteor } from 'meteor/meteor'
import { AntaresMeteorInit, AntaresInit, inAgencyRun } from 'meteor/deanius:antares'
import * as Actions from './actions'
import * as Fixtures from '../fixtures'
import Epics from './epics'
import gameReducer from './reducers/game'

// Build up a config object, via imports
const AntaresConfig = {
    Actions,
    ReducerForKey: () => gameReducer,
    Epics
}

// Pass the config to the meteorized version of AntaresInit
export const Antares = AntaresMeteorInit(AntaresInit)(AntaresConfig)

//seed it up
inAgencyRun('server', () => {
    Antares.firstSubscriber
        .then(() => new Promise(resolve => setTimeout(resolve, 2000)))
        .then(Meteor.bindEnvironment(() => {
        console.log('AD> starting a seed game')
        Antares.announce(Actions.Game.start, (new Fixtures.Game()).toJS())
    }))
})

inAgencyRun('client', () => {
    Antares.subscribe({
        key: 'game:demo'
    })
})

// In 'any' agent expose a top-level Antares global for demo purposes
inAgencyRun('any', function () {
    Object.assign(this, {
        Antares,
        Actions,
        announce: Antares.announce
    })
    // TODO define startup code here
})
