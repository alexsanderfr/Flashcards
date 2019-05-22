import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class AddDeck extends Component {
    render() {
        return (
            <View>
                <Text>Add Deck</Text>
            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(AddDeck)