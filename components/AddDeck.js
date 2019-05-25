import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle, getDecks } from '../utils/api'
import { saveDeckTitleAction } from '../actions'
import { blue, white } from '../utils/colors'

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
            <View style={styles.container}>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <TouchableOpacity style={styles.button} onPress={this.onSend.bind(this)}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        margin: 20
    },
    textInput: {
        height: 40,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        padding: 10,
        backgroundColor: blue,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: white,
        fontSize: 20,
    }
});

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(AddDeck)