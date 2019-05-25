import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { red, green, white, blue } from '../utils/colors'
import Card from './Card'

class Quiz extends Component {
    state = {
        index: 0,
        correct: 0,
        showAnswer: false,
    }

    onCorrect() {
        this.setState((previousState) => ({
            index: previousState.index + 1,
            correct: previousState.correct + 1,
            showAnswer: false
        }))
    }

    onIncorrect() {
        this.setState((previousState) => ({
            index: previousState.index + 1,
            showAnswer: false
        }))
    }

    onRestartQuiz() {
        this.setState(() => ({
            index: 0,
            correct: 0,
            showAnswer: false
        }))
    }

    onShowAnswer() {
        this.setState(() => ({
            showAnswer: true
        }))
    }

    getCard() {
        const deck = this.props.deck
        const index = this.state.index
        return deck.questions[index]
    }

    render() {
        const deck = this.props.deck
        const card = this.getCard()

        return (
            <View style={styles.container}>
                {card !== undefined ?
                    <View>
                        <Text style={styles.number}>{this.state.index + 1}/{deck.questions.length}</Text>

                        <Card card={card} showAnswer={this.state.showAnswer} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: blue }]}
                                onPress={this.onShowAnswer.bind(this)}>
                                <Text style={styles.buttonText}>Show Answer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: green }]}
                                onPress={this.onCorrect.bind(this)} >
                                <Text style={styles.buttonText}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: red }]}
                                onPress={this.onIncorrect.bind(this)}>
                                <Text style={styles.buttonText}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : <View>
                        <Text style={styles.finishText}>
                            You got {this.state.correct} out of {deck.questions.length} questions right
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: blue }]}
                                onPress={this.onRestartQuiz.bind(this)} >
                                <Text style={styles.buttonText}>Restart Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: blue }]}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        'Deck',
                                        { title: deck.title }
                                    )}>
                                <Text style={styles.buttonText}>Back to Deck</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
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
        padding: 40,
        margin: 20
    },
    number: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    finishText: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200
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

function mapStateToProps(_, { navigation }) {
    const { deck } = navigation.state.params
    return {
        deck: deck
    }
}

export default connect(mapStateToProps)(Quiz)