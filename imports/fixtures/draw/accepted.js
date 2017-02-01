import Pending from './pending'

export default class Accepted extends Pending {
    constructor() {
        super()
        Object.assign(this, {
            status: 'accepted',
            repliedAt: new Date()
        })
    }
}
