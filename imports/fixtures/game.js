import Immutable from 'immutable'
import * as Draw from './draw'

export default class Game {
    constructor() {
        return Immutable.fromJS({
            players: ['Self', 'Other'],
            position: {},
            draw: new Draw.pending()
        })
    }
}
