import { RECEIVE_DECKS, RECEIVE_DECK, SAVE_DECK_TITLE, ADD_CARD_TO_DECK } from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case RECEIVE_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case SAVE_DECK_TITLE:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.title]: {
                    title: state[action.title].title,
                    questions: [...state[action.title].questions, card]
                }
            }
        default:
            return state
    }
}

export default decks