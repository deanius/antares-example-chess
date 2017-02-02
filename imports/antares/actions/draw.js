export default {
    offer: ({ player }) => ({
        type: 'Draw.offer',
        payload: { player },
        meta: {
            antares: {
                key: 'game:demo'
            }
        }
    }),
    reply: ({ player, accept }) => ({
        type: 'Draw.reply',
        payload: { player, accept },
        meta: {
            antares: {
                key: 'game:demo'
            }
        }
    })
}
