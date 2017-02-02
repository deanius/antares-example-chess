import { Antares } from '/imports/antares/main'
import * as Draw from './draw'
const { Immutable } = Antares

export default class Game {
    constructor() {
        return Immutable.fromJS({
            players: ['Self', 'Other'],
            position: {},
            draw: new Draw.pending()
        })
    }
}
