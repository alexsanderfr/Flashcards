import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDeckAction } from '../actions'
import { AppLoading } from 'expo'

class Deck extends Component {
    state = {
        ready: false,
    }
    componentDidMount() {
        const { dispatch, title } = this.props
        getDecks().then((result) => result[title])
            .then((deck) => dispatch(receiveDeckAction(deck)))
            .then(() => this.setState(() => ({ ready: true })))
    }

    render() {
        const deck = this.props.deck

        const { ready } = this.state


        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View>
                <Text>Deck</Text>
                <Text>{deck.title}</Text>
                <Text>{deck.questions.length} questions</Text>
            </View>
        )
    }
}

function mapStateToProps(decks, { navigation }) {
    const { title } = navigation.state.params
    return {
        title: title,
        deck: decks[title]
    }
}

export default connect(mapStateToProps)(Deck)