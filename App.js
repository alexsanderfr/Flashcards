import React from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import { Constants } from 'expo'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { clearDatabase } from './utils/api';

function TranslucentStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

let TabNavigator = createBottomTabNavigator({
  Decks: { screen: DeckList },
  Add: { screen: AddDeck },
});

let StackNavigator = createStackNavigator({
  Home: { screen: TabNavigator},
  Deck: { screen: Deck}
});

let Navigation = createAppContainer(StackNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <Navigation />
      </Provider>
    );
  }
}