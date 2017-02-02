export default {
    offer: ({ player }) => ({
        type: 'Draw.offer',
        payload: { player },
        meta: {
            antares: {
                key: 'game:demo'
            }
        }
    })
}
