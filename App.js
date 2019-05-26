import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { blue, white } from './utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'

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
  },
  AddCard: {
    screen: AddCard, navigationOptions: {
      headerTintColor: white,
      title: "AddCard",
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  Quiz: {
    screen: Quiz, navigationOptions: {
      headerTintColor: white,
      title: "Quiz",
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
});

let Navigation = createAppContainer(StackNavigator);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <Navigation />
      </Provider>
    );
  }
}