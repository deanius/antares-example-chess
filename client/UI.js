import React from 'react'
import { connect } from 'react-redux'
import { mount } from 'react-mounter'
import { store, announce } from '/imports/antares/main'

const game = ({ drawIsVisible, drawIsMine, offerDraw }) => (
    <div>
        <h3>The Game...</h3>
        { 
            drawIsVisible() && 
            <div className="draw">
                {
                    drawIsMine() ? 
                        <div>
                            Your offer of a draw is awaiting a response
                        </div> :
                        <div>
                            Your opponent offers you a draw.
                            <ul>
                                <li><a href>Accept</a></li>
                                <li><a href>Decline</a></li>
                            </ul>
                        </div>
                }
            </div>
        }
        { 
            !drawIsVisible() &&
            <div className="draw-offer">
                <button onClick={offerDraw}>Offer Draw</button>
            </div>
        }
    </div>
)

const getCurrentUser = () => 'Self'
const getCurrentGameId = () => 'game:demo'

const mapStateToProps = state => {
    // These can be the inputs to a reselect selector
    let currentUser = getCurrentUser()
    let gameId = getCurrentGameId()
    let game = state.antares.get(gameId)

    return {
        drawIsVisible: () => {
            return game && game.get('draw')
        },
        drawIsMine: () => {
            return game && game.getIn(['draw', 'offeredBy']) === currentUser
        },
        // Event handlers
        offerDraw: () => {
            announce(Actions.Draw.offer, { player: currentUser })
                .endOfEpic()
                .then(() => console.log('The Draw Epic Is Finito.'))
        }
    }
}

mount(connect(mapStateToProps)(game), { store })
