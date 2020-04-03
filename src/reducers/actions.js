import cardContents from '../shared/cardContents';
import * as gameStates from '../shared/gameStates';

const cloneCards = (cards) => {
    return cards.map(c => {
        return {
            id: c.id,
            pairFound: c.pairFound,
            revealed: c.revealed,
            content: c.content
        };
    });
};

const getShuffledCards = pairs => {
    const cards = [];

    if (pairs > cardContents.length) {
        throw new Error('Invalid pair number. Reduce pair number or create more card contents!');
    }

    let cardId = 0;

    [...cardContents].slice(0, pairs).forEach(cc => {
        const card = {
            id: cardId++,
            pairFound: false,
            revealed: false,
            content: cc
        };
        
        cards.push(card);
        cards.push({...card, id: cardId++});
    });
    
    const shuffledCards = [];

    while (cards.length > 0) {
        const cardIndex = Math.floor(Math.random() * cards.length);

        shuffledCards.push(cards[cardIndex]);
        cards.splice(cardIndex, 1);
    }

    return shuffledCards;
};

export const init = (game, pairs) => {
    const updatedGame = {
        ...game,
        status: gameStates.GUESS,
        canPick: true,
        picks: 0,
        moves: 0,
        cards: getShuffledCards(pairs)
    };

    return updatedGame;
};

export const cardClick = (game, id) => {
    const cardToRevealIndex = game.cards.findIndex(c => c.id === id);
    const updatedCards = cloneCards(game.cards);    
    
    const cardToReveal = updatedCards[cardToRevealIndex];
    cardToReveal.revealed = true;

    return {
        ...game,
        status: gameStates.GUESS,
        picks: game.picks + 1,
        cards: updatedCards
    };
};

export const checkPair = (game) => {
    const revealedCards = game.cards.filter(c => c.revealed && !c.pairFound);
    const updatedCards = cloneCards(game.cards);
    const firstRevealedCardIndex = updatedCards.findIndex(c => c.id === revealedCards[0].id);
    const secondRevealedCardIndex = updatedCards.findIndex(c => c.id === revealedCards[1].id);
    const isMatch = revealedCards[0].content === revealedCards[1].content;
    let updatedStatus = gameStates.WRONG;

    if (isMatch) {
        updatedCards[firstRevealedCardIndex].pairFound = true;
        updatedCards[secondRevealedCardIndex].pairFound = true;

        updatedStatus = gameStates.MATCH;

        if (updatedCards.filter(c => c.pairFound).length === updatedCards.length) {
            updatedStatus = gameStates.WIN;
        }
    } else {
        updatedCards[firstRevealedCardIndex].revealed = false;
        updatedCards[secondRevealedCardIndex].revealed = false;
    }

    return { 
        ...game,
        moves: game.moves + 1,
        status: updatedStatus,
        picks: 0,
        cards: updatedCards,
        canPick: true
    };
};

export const setCanPick = (game, canPick) => {
    return {
        ...game,
        canPick: canPick
    };
};