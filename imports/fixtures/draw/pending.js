import Immutable from 'immutable'

export default class Draw {
    constructor() {
        return Immutable.fromJS({
            status: 'pending',
            offeredBy: 'Other'
        })
    }
}
