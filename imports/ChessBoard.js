/* global: window.ChessBoard */
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'
import React from 'react'

const chessboardId = 'chessboard-js'

let rebindChessBoard = ({ game, orientation }) => {
    let { position } = game
    new window.ChessBoard(chessboardId, {
        draggable: true,
        position: position,
        orientation: orientation.toLowerCase(),
        onDrop: (from, to) => {
            if (from === to || (to === 'offboard')) { return }

            let mover = position[from]
            console.log('TODO move')
        }
    })
}

export default class ChessBoard extends React.Component {
    render() {
        return (
            <div>
                <div id={ chessboardId } style={ {width: 450} }></div>
            </div>
        )
    }

    // Lifecycle hooks to initialize the 3rd party chess lib the first, and later times
    componentDidMount() {
        rebindChessBoard(this.props)
    }

    componentDidUpdate() {
        rebindChessBoard(this.props)
    }
}
