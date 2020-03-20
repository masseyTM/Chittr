import React, { Component } from 'react';
import { Text, View, TextInput,ActivityIndicator,StyleSheet, Button, Alert} from 'react-native';
class LogInScreen extends Component{
  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {

      email: '',
      password: '',
      id: '',
      token: '',


    };

  }


  logIn (){
    return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
    {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(responseJson => {
      // Showing response message coming from server after inserting records.
      Alert.alert(JSON.stringify(responseJson));
      this.state.token = responseJson.token
      this.state.id = responseJson.id
      this.props.navigation.navigate('Home', { token: this.state.token ,id: this.state.id})
      //     this.props.navigation.navigate('Home',{id: this.state.id})
    })
    //})
    .catch((error) => {
      Alert.alert("Invalid email and/or password"); 
    });

  }



  render(){
    return(
      <View>
      <Text>Already a member? Log in below , else click the create account button</Text>

      <Text>{this.state.id}</Text>
      <Text>{this.state.token}</Text>

      <TextInput style={{ height: 40, marginTop: 20, borderColor: 'gray', borderWidth: 1 }}
      underlineColorAndroid = "transparent"
      placeholder = "Enter email"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"

      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      />
      <TextInput style={{ height: 40, marginTop: 20,marginBottom: 50, borderColor: 'gray', borderWidth: 1 }}
      secureTextEntry={true}
      underlineColorAndroid = "transparent"
      placeholder = "Enter password"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"

      onChangeText={(password) => this.setState({password})}
      value={this.state.password}
      />
      <Button
      title="Log In"
      onPress ={() => this.logIn()}/>

      <Button
      title="Create account"
      onPress={() => this.props.navigation.navigate('CreateAccount')}/>


      </View>
    );
  }



}
export default LogInScreen;
