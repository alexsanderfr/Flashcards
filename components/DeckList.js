import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecksAction } from '../actions'
import { AppLoading } from 'expo'
import { objectToArray } from '../utils/helpers'
import { gray } from '../utils/colors'

class DeckList extends Component {
    state = {
        ready: false,
        bounceValue: new Animated.Value(1)
    }

    constructor(props) {
        super(props);

        this.onDeck = this.onDeck.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props

        getDecks()
            .then((decks) => dispatch(receiveDecksAction(decks)))
            .then(() => this.setState(() => ({ ready: true })))
    }

    onDeck(deck) {
        const bounceValue = this.state.bounceValue

        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.2 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4 })
        ]).start()

        this.props.navigation.navigate(
            'Deck',
            { deck: deck }
        )
    }



    render() {
        const decks = objectToArray(this.props.decks)

        const { ready, bounceValue } = this.state


        if (ready === false) {
            return <AppLoading />
        }

        return (
            <ScrollView>
                {decks.map((deck) => (
                    <Animated.View key={deck.title} style={{ transform: [{ scale: bounceValue }] }}>
                        <TouchableOpacity key={deck.title} style={styles.item} onPress={() => this.onDeck(deck)}>
                            <Text style={styles.title}>{deck.title}</Text>
                            <Text style={styles.questions}>{deck.questions.length} questions</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ))}
            </ScrollView>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        borderRadius: 5,
        padding: 40,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    questions: {
        alignSelf: 'center',
        fontSize: 14,
        color: gray
    },
});


export default connect(mapStateToProps)(DeckList)