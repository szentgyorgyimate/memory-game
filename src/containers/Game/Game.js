import React, { useReducer, useEffect } from 'react';

import './Game.css';
import gameReducer from '../../reducers/gameReducer';

import Card from '../../components/Card/Card';
import * as actionTypes from '../../shared/actionTypes';
import * as gameStates from '../../shared/gameStates';

const PAIRS = 8;

const initialGame = {
    status: gameStates.GUESS,
    canPick: true,
    picks: 0,
    moves: 0,
    cards: []
};

const Game = () => {
    const [game, dispatch] = useReducer(gameReducer, initialGame);

    useEffect(() => {
        dispatch({type: actionTypes.INIT, pairs: PAIRS});
    }, []);

    useEffect(() => {
        if (game.picks === 2) {
            dispatch({type: actionTypes.SET_CAN_PICK, canPick: false});
        }
    }, [game.picks]);

    useEffect(() => {
        if (!game.canPick) {
            setTimeout(() => {
                dispatch({type: actionTypes.CHECK_PAIR});
            }, 1000);
        }
    }, [game.canPick])

    const onRestartClicked = () => {
        if (game.moves > 0 && game.canPick) {
            dispatch({type: actionTypes.INIT, pairs: PAIRS});
        }
    };

    const onCardClicked = (id, revealed) => {
        if (game.canPick && !revealed) {
            dispatch({type: actionTypes.CARD_CLICK, id: id});
        }
    };

    const getStatusSpan = () => {
        switch (game.status) {
            case gameStates.MATCH: return <span className="match">It's a match!</span>;
            case gameStates.WIN: return <span className="win">You have won!</span>;
            default: return <span></span>;
        }
    };
    console.log(game.cards);
    return <div className="game">
        <div className="header">
            <div className="status">
                <span>Moves: {game.moves}</span>
                {getStatusSpan()}
                <button className={game.moves === 0 || !game.canPick ? 'disabled' : ''} onClick={onRestartClicked}>Restart</button>
            </div>
        </div>
        <div className="game-area">
            {game.cards.map(c => <Card key={`card_${c.id}`} {...c} cardClicked={() => {onCardClicked(c.id, c.revealed)}} />)}
        </div>
    </div>;
};

export default Game;