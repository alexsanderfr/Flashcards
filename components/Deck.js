import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { gray, blue, white } from '../utils/colors'
import { getDecks } from '../utils/api'
import { receiveDecksAction } from '../actions'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Deck extends Component {

    state = {
        bounceValue: new Animated.Value(1)
    }

    componentDidMount() {
        const bounceValue = this.state.bounceValue
        const { dispatch } = this.props

        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.2 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4 })
        ]).start()

        getDecks().then((decks) => dispatch(receiveDecksAction(decks)))
    }

    render() {
        const deck = this.props.deck
        const bounceValue = this.state.bounceValue

        return (
            <View style={styles.container}>
                <Animated.Text style={[styles.title, { transform: [{ scale: bounceValue }] }]}>{deck.title}</Animated.Text>
                <Animated.Text style={[styles.questions, { transform: [{ scale: bounceValue }] }]}>{deck.questions.length} questions</Animated.Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => 
                        this.props.navigation.navigate(
                            'AddCard',
                            { title: deck.title }
                        )}>
                        <Text style={styles.buttonText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        clearLocalNotification().then(setLocalNotification)
                        this.props.navigation.navigate(
                            'Quiz',
                            { deck: deck }
                        )
                    }}>
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

function mapStateToProps(decks, { navigation }) {
    const { title } = navigation.state.params
    return {
        deck: decks[title],
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
    title: {
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: 'bold'
    },
    questions: {
        alignSelf: 'center',
        fontSize: 20,
        color: gray,
    },
    buttonContainer: { marginTop: 200 },
    button: {
        padding: 10,
        backgroundColor: blue,
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: white,
        fontSize: 20,
    }
})

export default connect(mapStateToProps)(Deck)