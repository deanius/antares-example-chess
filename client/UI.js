import React from 'react'
import { connect } from 'react-redux'
import { mount } from 'react-mounter'
import { store, announce } from '/imports/antares/main'
import ChessBoard from '/imports/ChessBoard'
import GameFixture from '/imports/fixtures/game'
import { Bert } from 'meteor/themeteorchef:bert'

const gameOverStyle = {
  position: 'absolute',
  fontSize: '6em',
  opacity: 0.6,
  top: 0,
  left: 0,
  backgroundColor: 'black',
  color: 'white',
  zIndex: 100
}

const _Game = ({ gameOver, drawIsVisible, drawConcluded, drawStatus, drawIsMine, offerDraw, currentPlayer }) => (
  <div>
    <h2>Antares Chess: &nbsp;
        <span>
        View As: <b>{currentPlayer}</b> &nbsp;|&nbsp;
        <a
          href="#change-sides"
          onClick={(e) => {
            announce(Actions.View.changeSides)
            e.preventDefault()
          }}
        >{currentPlayer === 'White' ? 'Black' : 'White'}</a>
      </span>
    </h2>
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
                <li><a href="#draw-accept" onClick={(e) => {
                  announce(Actions.Draw.reply, { accept: true, player: currentPlayer })
                  e.preventDefault()
                }}>Accept</a></li>
                <li><a href="#draw-decline" onClick={(e) => {
                  announce(Actions.Draw.reply, { accept: false, player: currentPlayer })
                  e.preventDefault()
                }}>Decline</a></li>
              </ul>
            </div>
        }
      </div>
    }
    {
      !drawIsVisible() &&
      <div className="draw-offer">
        <button onClick={offerDraw} style={{ fontSize: '150%', margin: '.5em' }}
        >Offer Draw</button>
      </div>
    }
    {
      !gameOver() && drawConcluded() &&
      <div className="draw-status">
        Draw Staus: {drawStatus()}
      </div>
    }
    {
      gameOver() &&
      <div className="game-over" style={gameOverStyle}>
        Game Over!
      </div>
    }
    <div>
      <ChessBoard game={(new GameFixture).toJS()}
        orientation={currentPlayer}
      />
      {/*<img src="/chessboard.gif" onClick={(e) => {
        // a temporary way to allow a move until the board is truly live
        announce(Actions.Game.move, { from: 'e2', to: 'e4', player: currentPlayer })
        e.preventDefault()
      }} />*/}
    </div>
  </div>
)

const getCurrentGameId = () => 'game:demo'

const mapStateToProps = state => {
  // These can be the inputs to a reselect selector
  let currentPlayer = state.view.get('currentPlayer')
  let gameId = getCurrentGameId()
  let game = state.antares.get(gameId)

  // The props will be an aggregation of the following field types:
  // - View state
  // - Persisted data state
  // - Event Handlers
  return {
    // View fields
    currentPlayer: state.view.get('currentPlayer'),
    // Accessors/Helpers for persisted data
    drawIsVisible: () => {
      return game && game.get('draw') && game.getIn(['draw', 'status']) !== 'accepted'
    },
    drawConcluded: () => {
      return ['accepted', 'declined'].includes(game && game.getIn(['draw', 'status']))
    },
    drawStatus: () => {
      return game.getIn(['draw', 'status'])
    },
    gameOver: () => {
      return  game && !game.get('active')
    },
    drawIsMine: () => {
      return game && game.getIn(['draw', 'offeredBy']) === currentPlayer
    },
    // Event handlers - announcement creators
    offerDraw: () => {
      announce(Actions.Draw.offer, { player: currentPlayer })
        .endOfEpic()
        // This is how you attach behavior to the end of an epic that an action triggers
        .then(({ payload }) => {
          Bert.alert(payload.accept ? 'Your draw was accepted - lucky bastard' : 'Damn - they declined yo draw, fool!', 'info')
        })
    }
  }
}

const Game = connect(mapStateToProps)(_Game)
// mount it at #react-root, placing store in the props
const props = { store }
mount(Game, props)
