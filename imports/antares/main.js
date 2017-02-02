import { AntaresMeteorInit, AntaresInit, inAgencyRun } from 'meteor/deanius:antares'
import * as Actions from './actions'

// Build up a config object, via imports
const AntaresConfig = {
    Actions
}

// Pass the config to the meteorized version of AntaresInit
export const Antares = AntaresMeteorInit(AntaresInit)(AntaresConfig)

// In 'any' agent expose a top-level Antares global for demo purposes
inAgencyRun('any', function () {
    Object.assign(this, {
        Antares
    })
    // TODO define startup code here
})
