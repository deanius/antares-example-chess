import Pending from './pending'

export default class Declined extends Pending {
    constructor() {
        super()
        return this.merge({
            status: 'declined',
            repliedAt: new Date()
        })
    }
}
