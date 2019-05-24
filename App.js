import React from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { Constants } from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  Home: TabNavigator
});

let Navigation = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    clearDatabase()
    return (
      <Provider store={createStore(reducer, middleware)}>
        <TranslucentStatusBar/>
        <Navigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
