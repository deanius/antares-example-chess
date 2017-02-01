import { AntaresMeteorInit, AntaresInit, inAgencyRun } from 'meteor/deanius:antares'

import * as Fixtures from '../fixtures'

// Build up a config object, via imports
const AntaresConfig = {}

// Pass the config to the meteorized version of AntaresInit
export const Antares = AntaresMeteorInit(AntaresInit)(AntaresConfig)

// In 'any' agent expose a top-level Antares global for demo purposes
inAgencyRun('any', function () {
    Object.assign(this, {
        Antares,
        Fixtures
    })
    // TODO define startup code here
})
