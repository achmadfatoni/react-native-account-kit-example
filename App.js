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

  constructor(props){
    super(props);
    this.state = {
      token: null,
      account: null
    }
  }

  componentWillMount() {
    this.configureAccountKit();

    AccountKit.getCurrentAccessToken()
      .then(token => {
        if (token) {
          AccountKit.getCurrentAccount().then(account => {
            console.log(account);
            this.setState({
              token: token,
              account: account,
            })
          })
        } else {
          console.log('No user account logged')
        }
      })
      .catch(e => console.log('Failed to get current access token', e))
  }

  configureAccountKit() {
    AccountKit.configure({
      countryWhitelist: ["ID", "MY", "SG"],
      countryBlacklist: ["US"],
      defaultCountry: "ID"
    });
  }

  onLogin = (token) => {
    if (!token) {
      console.warn('User canceled login')
      this.setState({})
      console.log(this.state);
    } else {
      AccountKit.getCurrentAccount().then(account => {
        this.setState({
          token: token,
          account: account,
        });
        console.log(this.state);
      })
    }
  }

  renderLoginPage = () => {
    return (
      <LoginButton
        style={styles.buttonContainer}
        type="phone"
        onLogin={(token) => this.onLogin(token)}
        onError={(error) => this.onLogin(error)}
      >
        <Text style={styles.buttonText}>Login with SMS</Text>
      </LoginButton>
    )
  }

  renderUserPage = () => {
    const { id, phoneNumber } = this.state.account;
    return (
      <View>
        <Text style={styles.label}>Account Kit ID</Text>
        <Text style={styles.text}>{ id }</Text>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.label}>{ phoneNumber.countryCode }{ phoneNumber.number }</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.account ? this.renderUserPage() : this.renderLoginPage()}
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
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
