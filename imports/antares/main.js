import { Meteor } from 'meteor/meteor'
import { AntaresMeteorInit, AntaresInit, inAgencyRun, isInAgency } from 'meteor/deanius:antares'
import * as Actions from './actions'
import * as Fixtures from '../fixtures'
import Epics from './epics'
import gameReducer from './reducers/game'
import { ViewReducer } from './reducers/view'
import Lockr from 'lockr'

// Build up a config object, via imports
const AntaresConfig = {
    Actions,
    ReducerForKey: () => gameReducer,
    Epics,
    ViewReducer,
    MetaEnhancers: [
        () => ({ originAgentId: Antares.agentId })
    ]
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
    Antares.subscribeRenderer(({ action }) => {
        if (action.type.startsWith('View.')) {
            Lockr.set('Antares.viewData', Antares.getViewState().toJS())
        }
    })
    Antares.startup.then(() => {
        let saved = Lockr.get('Antares.viewData')
        if (!saved) return
        Antares.announce({
            type: 'View.restore',
            payload: saved,
            meta: { antares: { localOnly: true } }
        })
    })
})

// In 'any' agent expose a top-level Antares global for demo purposes
inAgencyRun('any', function () {
    Object.assign(this, {
        Antares,
        Actions,
        inAgencyRun,
        isInAgency,
        announce: Antares.announce
    })
    // TODO define startup code here
})
