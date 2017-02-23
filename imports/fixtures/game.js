import Immutable from 'immutable'
import * as Draw from './draw'

export default class Game {
    constructor() {
        return Immutable.fromJS({
            players: ['Self', 'Other'],
            position: {
                e1: 'wK',
                e8: 'bK'
            },
            nextToMove: 'white',
            draw: null,
            active: true,
            score: null
        })
    }
}
