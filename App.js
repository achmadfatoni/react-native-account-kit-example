/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import  AccountKit, { LoginButton } from 'react-native-facebook-account-kit'
export default class App extends Component<{}> {

  componentWillMount() {
    this.configureAccountKit();
  }

  configureAccountKit() {
    AccountKit.configure({
      countryWhitelist: ["ID", "MY", "SG"],
      countryBlacklist: ["US"],
      defaultCountry: "ID"
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <LoginButton
            style={styles.buttonContainer}
            type="phone"
            onLogin={(token) => console.log(token)}
            onError={(error) => console.log(error)}
        >
          <Text style={styles.buttonText}>Login with SMS</Text>
        </LoginButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
      backgroundColor:'blue',
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginHorizontal: 5,
  },
  buttonText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700',
  }
});
