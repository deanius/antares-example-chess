import React from 'react'
import { connect } from 'react-redux'
import { mount } from 'react-mounter'
import { store, announce } from '/imports/antares/main'

const game = ({ drawIsVisible, drawIsMine, offerDraw, currentPlayer }) => (
    <div>
        <h3>The Game...</h3>
                <div className="sm">
                    View As: <b>{currentPlayer}</b> &nbsp;|&nbsp;
                    <a
                      href="#change-sides"
                      onClick={(e) => {
                          announce(Actions.View.changeSides)
                          e.preventDefault()
                      }}
                    >{currentPlayer === 'Self' ? 'Other' : 'Self'}</a>
                </div>
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
                                <li><a href="#change-sides" onClick={(e) => {
                                    announce(Actions.Draw.reply, { accept: true, player: currentPlayer })
                                    e.preventDefault()
                                }}>Accept</a></li>
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

const getCurrentGameId = () => 'game:demo'

const mapStateToProps = state => {
    // These can be the inputs to a reselect selector
    let currentPlayer = state.view.get('currentPlayer')
    let gameId = getCurrentGameId()
    let game = state.antares.get(gameId)

    return {
        drawIsVisible: () => {
            return game && game.get('draw') && game.getIn(['draw', 'status']) !== 'accepted'
        },
        drawIsMine: () => {
            return game && game.getIn(['draw', 'offeredBy']) === currentPlayer
        },
        // Event handlers
        offerDraw: () => {
            announce(Actions.Draw.offer, { player: currentPlayer })
                .endOfEpic()
                .then(() => console.log('The Draw Epic Is Finito.'))
        },
        currentPlayer
    }
}

mount(connect(mapStateToProps)(game), { store })
