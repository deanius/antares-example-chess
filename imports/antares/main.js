import { Meteor } from 'meteor/meteor'
import { AntaresMeteorInit, AntaresInit, inAgencyRun } from 'meteor/deanius:antares'
import * as Actions from './actions'
import * as Fixtures from '../fixtures'
import Epics from './epics'
import gameReducer from './reducers/game'
import { ViewReducer } from './reducers/view'

// Build up a config object, via imports
const AntaresConfig = {
    Actions,
    ReducerForKey: () => gameReducer,
    Epics,
    ViewReducer
}

// Pass the config to the meteorized version of AntaresInit
export const Antares = AntaresMeteorInit(AntaresInit)(AntaresConfig)
export const { store, announce } = Antares

//seed it up
inAgencyRun('server', () => {
    Antares.startup
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
