import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, formatDecks } from './_deck'

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => results[id])
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(formatDecks)
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  return getDecks().then((result) => AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: [...result[title].questions, card]
    }
  })))
}