import { inAgencyRun } from 'meteor/deanius:antares'
import { default as Draw } from './draw'

inAgencyRun('any', function () {
    Object.assign(this, {
        Fixtures: {
            Draw
        }
    })
})

export { Draw }
