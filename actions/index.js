export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_DECK = 'RECEIVE_DECK'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function receiveDecksAction(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function receiveDeckAction(deck) {
    return {
        type: RECEIVE_DECK,
        deck,
    }
}

export function saveDeckTitleAction(title) {
    return {
        type: SAVE_DECK_TITLE,
        title,
    }
}

export function addCardToDeckAction(title, card) {
    return {
        type: ADD_CARD_TO_DECK,
        title,
        card
    }
}