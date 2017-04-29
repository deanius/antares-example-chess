// LEFTOFF  - meta: antares: {epics: {runInAgency: 'server'}}
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
    }),
    move: ({ player, from, to, promotionChoice }) => ({
        type: 'Move.make',
        payload: { player, from, to, promotionChoice },
        meta: {
            antares: {
                key: 'game:demo'
            }
        }
    })
}
