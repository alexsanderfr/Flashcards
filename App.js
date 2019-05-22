import React from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { Constants } from 'expo'

function TranslucentStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          <TranslucentStatusBar/>
          <DeckList />
        </View>
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
