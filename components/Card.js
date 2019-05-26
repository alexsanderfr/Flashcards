import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { red, white } from '../utils/colors'

class Card extends Component {

    render() {
        const {card, showAnswer} = this.props

        return (
            <View>
                <Text style={styles.title}>{card.question}</Text>
                <Text style={styles.answer}>{showAnswer ? card.answer : ''}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 28,
        fontWeight: 'bold'
    },
    answer: {
        alignSelf: 'center',
        fontSize: 20,
        color: red,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: white,
        fontSize: 20,
    }
});

export default Card