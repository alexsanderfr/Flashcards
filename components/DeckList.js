import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecksAction } from '../actions'
import { AppLoading } from 'expo'
import { objectToArray } from '../utils/helpers'
import { gray } from '../utils/colors'

class DeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
            .then((decks) => dispatch(receiveDecksAction(decks)))
            .then(() => this.setState(() => ({ ready: true })))
    }


    render() {
        const decks = objectToArray(this.props.decks)

        const { ready } = this.state


        if (ready === false) {
            return <AppLoading />
        }

        return (
            <ScrollView>
                {decks.map((deck) => (
                    <TouchableOpacity key={deck.title} style={styles.item} onPress={() =>
                        this.props.navigation.navigate(
                            'Deck',
                            { deck: deck }
                        )}>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.questions}>{deck.questions.length} questions</Text>
                    </TouchableOpacity>
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