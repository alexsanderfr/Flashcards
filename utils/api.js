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

export function clearDatabase() {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({}))
}

export function seedDatabase() {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }))
}