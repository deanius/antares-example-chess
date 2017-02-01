import Pending from './pending'

export default class Declined extends Pending {
    constructor() {
        super()
        Object.assign(this, {
            status: 'declined',
            repliedAt: new Date()
        })
    }
}
