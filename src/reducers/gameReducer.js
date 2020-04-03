import * as actionTypes from '../shared/actionTypes';
import * as actions from './actions';

const gameReducer = (game, action) => {
    switch (action.type) {
        case actionTypes.INIT: return actions.init(game, action.pairs);
        case actionTypes.CARD_CLICK: return actions.cardClick(game, action.id);
        case actionTypes.CHECK_PAIR: return actions.checkPair(game);
        case actionTypes.SET_CAN_PICK: return actions.setCanPick(game, action.canPick);
        default: throw new Error('Invalid action type!');
    }
};

export default gameReducer;