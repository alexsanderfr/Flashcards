import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { addCardToDeckAction } from '../actions'
import { blue, white } from '../utils/colors'

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    onSend() {
        const { question, answer } = this.state
        const { dispatch, title } = this.props

        card = {
            question: question, 
            answer: answer
        }

        addCardToDeck(title, card)
        .then(dispatch(addCardToDeckAction(title, card)))
        .then(() => this.setState(() => ({ question: '', answer: '' })))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>What is the question?</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(question) => this.setState({ question })}
                    value={this.state.question}
                />
                <Text style={styles.text}>What is the answer?</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(answer) => this.setState({ answer })}
                    value={this.state.answer}
                />
                <TouchableOpacity style={styles.button} onPress={this.onSend.bind(this)}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

function mapStateToProps(_, { navigation }) {
    const { title } = navigation.state.params
    return {
        title
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 10
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
    },
    textInput: {
        height: 40,
        width: 300,
        marginTop: 10,
        padding: 5,
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


export default connect(mapStateToProps)(AddCard)