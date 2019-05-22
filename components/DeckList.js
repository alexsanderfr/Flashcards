import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, saveDeckTitle } from '../utils/api'
import { receiveDecksAction, saveDeckTitleAction } from '../actions'
import { AppLoading } from 'expo'
import { objectToArray } from '../utils/helpers'

class DeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
            .then((decks) => dispatch(receiveDecksAction(decks)))
            .then(() => this.setState(() => ({ ready: true })))
    }


    render() {
        const decks = objectToArray(this.props)

        const { ready } = this.state


        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View>
                <Text>Deck List</Text>
                {decks.map((deck) => (
                    <View key={deck.title}>
                        <Text>{deck.title}</Text>
                    </View>
                ))}
            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)