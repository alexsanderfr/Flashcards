import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle, getDeck, getDecks } from '../utils/api'
import { saveDeckTitleAction } from '../actions'
class AddDeck extends Component {
    state = {
        text: '',
    }
    onSend() {
        const { text } = this.state
        const { dispatch } = this.props

        saveDeckTitle(text)
            .then(getDecks()
                .then((result) => result[text])
                .then((deck) => dispatch(saveDeckTitleAction(deck.title)))
                .then(() => this.setState(() => ({ text: '' }))))
    }

    render() {
        return (
            <View>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <TouchableOpacity onPress={this.onSend.bind(this)}>
                    <Text>Send</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(AddDeck)