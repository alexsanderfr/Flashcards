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
import { blue, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

function TranslucentStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

let TabNavigator = createBottomTabNavigator({
  Decks: {
    screen: DeckList, navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='home' size={30} color={tintColor} />
    }
  },
  Add: {
    screen: AddDeck, navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
});

let StackNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator, navigationOptions: {
      headerTintColor: white,
      title: "Home",
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },

  Deck: {
    screen: Deck, navigationOptions: {
      headerTintColor: white,
      title: "Deck",
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
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