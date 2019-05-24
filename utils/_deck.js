import { AsyncStorage } from 'react-native'
export const DECK_STORAGE_KEY = 'deck'

function setDummyData() {

    const dummyData = {}
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}

export function formatDeck(results) {
    return results === null
        ? setDummyData()
        : JSON.parse(results)
}