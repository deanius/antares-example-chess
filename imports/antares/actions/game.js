export default {
    start: (game) => ({
        type: 'Antares.store',
        payload: game,
        meta: {
            antares: {
                key: 'game:demo'
            }
        }
    }),
    end: ({ score }) => ({
        type: 'Game.end',
        payload: { score },
        meta: {
            antares: {
                key: 'game:demo'
            }
        }
    })
}
