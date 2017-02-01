import Pending from './pending'

export default class Accepted extends Pending {
    constructor() {
        super()
        return this.merge({
            status: 'accepted',
            repliedAt: new Date()
        })
    }
}
