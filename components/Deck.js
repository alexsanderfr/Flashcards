import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, blue, white } from '../utils/colors'

class Deck extends Component {

    render() {
        const deck = this.props.deck

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

function mapStateToProps(_, { navigation }) {
    const { deck } = navigation.state.params
    return {
        deck,
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