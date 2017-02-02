import { inAgencyRun } from 'meteor/deanius:antares'
import Draw from './draw'
import Game from './game'
inAgencyRun('any', function () {
    Object.assign(this, {
        Fixtures: {
            Draw,
            Game
        }
    })
})

export { Draw, Game }
