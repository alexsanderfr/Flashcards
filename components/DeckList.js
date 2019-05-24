import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecksAction } from '../actions'
import { AppLoading } from 'expo'
import { objectToArray } from '../utils/helpers'

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
            <View>
                <Text>Deck List</Text>
                {decks.map((deck) => (
                    <TouchableOpacity key={deck.title} style={styles.container} onPress={() =>
                        this.props.navigation.navigate(
                            'Deck',
                            { title: deck.title }
                        )}>
                        <Text>{deck.title}</Text>
                        <Text>{deck.questions.length} questions</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks: decks
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        margin: 20
    },
});


export default connect(mapStateToProps)(DeckList)