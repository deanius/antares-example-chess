export default {
    start: (game) => ({
        type: 'Antares.store',
        payload: game,
        meta: {
            antares: {
                key: 'game:demo'
            }
        }
    })
}
