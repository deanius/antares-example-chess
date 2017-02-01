import { Antares } from '/imports/antares/main'

const { Immutable } = Antares

export default class Draw {
    constructor() {
        return Immutable.fromJS({
            status: 'pending'
        })
    }
}
