import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDeckAction } from '../actions'
import { AppLoading } from 'expo'
import { gray, blue, white } from '../utils/colors'

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
            <View style={styles.container}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.questions}>{deck.questions.length} questions</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() =>
                        this.props.navigation.navigate(
                            'AddCard',
                            { title: deck.title }
                        )}>
                        <Text style={styles.buttonText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() =>
                        this.props.navigation.navigate(
                            'Quiz',
                            { deck: deck }
                        )}>
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
        title: title,
        deck: decks[title]
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
});

export default connect(mapStateToProps)(Deck)