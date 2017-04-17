import Immutable from 'immutable'
import * as Draw from './draw'

export default class Game {
    constructor() {
        return Immutable.fromJS({
            players: ['White', 'Black'],
            position: {
                e1: 'wK',
                f2: 'wP',
                e8: 'bK',
                d7: 'bQ',
                f7: 'bR'
            },
            nextToMove: 'white',
            draw: null,
            active: true,
            score: null
        })
    }
}
