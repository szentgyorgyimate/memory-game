import React from 'react';

import './Card.css';

const CARD_CLASS = 'card';
const REVEALED_CLASS = 'revealed';
const PAIR_FOUND_CLASS = 'pair-found';

const getCardClassName = (revealed, pairFound) => {
    let cardClassName = CARD_CLASS;

    if (pairFound) {
        cardClassName = `${cardClassName} ${PAIR_FOUND_CLASS}`;
    } else if (revealed) {
        cardClassName = `${cardClassName} ${REVEALED_CLASS}`;
    }

    return cardClassName;
};

const Card = ({content, revealed, pairFound, cardClicked}) => {
    return <div className={getCardClassName(revealed, pairFound)} onClick={cardClicked}>
        {revealed && <span className={REVEALED_CLASS} role="img">{content}</span>}
    </div>;
};

export default Card;