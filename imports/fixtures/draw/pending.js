import Faker from 'faker'

export default class Draw {
    constructor() {
        Object.assign(this, {
            status: 'pending',
            createdAt: Faker.date.recent()
        })
    }
}
